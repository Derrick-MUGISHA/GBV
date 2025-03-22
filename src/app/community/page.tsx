"use client";
import { useEffect, useState } from "react";
import {
  database as db,
  ref,
  push,
  onValue,
  off,
  set,
} from "@/app/firebase/config";
import { DataSnapshot } from "firebase/database";
import { Message, ChatGroup } from "@/app/types/chat";
import { v4 as uuidv4 } from "uuid";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

type OnboardingStep = "rules" | "auth" | "name" | "complete";

export default function ChatInterface() {
  const [activeGroup, setActiveGroup] = useState<ChatGroup["id"]>("Rwanda");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("rules");
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  // import { DataSnapshot } from 'firebase/database';

  // Auth initialization
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      if (user) {
        handleAuthUser(user);
      } else {
        handleAnonymousUser();
      }
    });
    return unsubscribe;
  }, []);

  const handleAuthUser = (user: User) => {
    setSenderName(user.displayName || "Anonymous");
    setUserId(user.uid);
    localStorage.setItem("chatUserId", user.uid);
    localStorage.setItem("chatUserName", user.displayName || "Anonymous");
    checkRulesAcceptance(true);
  };

  const handleAnonymousUser = () => {
    const storedUserId = localStorage.getItem("chatUserId") || uuidv4();
    const storedName = localStorage.getItem("chatUserName") || "Anonymous";

    setUserId(storedUserId);
    setSenderName(storedName);
    localStorage.setItem("chatUserId", storedUserId);
    checkRulesAcceptance(false);
  };

  const checkRulesAcceptance = (isAuthenticated: boolean) => {
    const storedRules = localStorage.getItem("acceptedRules");
    setAcceptedRules(storedRules === "true");
    setOnboardingStep(
      storedRules === "true" ? (isAuthenticated ? "complete" : "name") : "rules"
    );
  };

  // Firebase data operations
  useEffect(() => {
    if (!userId || onboardingStep !== "complete") return;

    const messagesRef = ref(db, `community/groups/${activeGroup}/messages`);
    const handleData = (snapshot: DataSnapshot) => {
      const messagesData = snapshot.val() as Record<string, { sender: string; text: string; timestamp: number; userId: string; isAuthenticated: boolean; persistent: boolean }> || {};
      const formattedMessages = Object.entries(messagesData).map(
        ([id, msgData]) => ({
          id,
          ...msgData,
          timestamp: new Date(msgData.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
      );

      setMessages(formattedMessages);
      scrollToBottom();
    };

    onValue(messagesRef, handleData);

    return () => {
      off(messagesRef, 'value', handleData);
    };
  }, [activeGroup, userId, onboardingStep]);

  // Auth handlers
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const auth = getAuth();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  // Rules and onboarding
  const acceptRules = () => {
    localStorage.setItem("acceptedRules", "true");
    setAcceptedRules(true);
    setOnboardingStep(authUser ? "complete" : "auth");
  };

  const handleNameChange = (newName: string) => {
    const trimmedName = newName.trim();
    if (trimmedName) {
      setSenderName(trimmedName);
      localStorage.setItem("chatUserName", trimmedName);
      set(ref(db, `users/${userId}/displayName`), trimmedName);
    }
    setShowNameModal(false);
    setOnboardingStep("complete");
  };

  // Chat operations
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;

    try {
      await push(ref(db, `community/groups/${activeGroup}/messages`), {
        sender: senderName,
        text: newMessage,
        timestamp: Date.now(),
        userId: userId,
        isAuthenticated: !!authUser,
        persistent: true,
      });
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // UI helpers
  const scrollToBottom = () => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      setTimeout(
        () => (messagesContainer.scrollTop = messagesContainer.scrollHeight),
        100
      );
    }
  };

  const communityGroups: ChatGroup["id"][] = [
    "Rwanda",
    "General",
    "Help",
    "Announcements",
    "Resources",
    "Others",
  ];

  // Mobile menu toggle handler
  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(prevState => !prevState);
  // };
  const router = useRouter();
  const handleExit = () => {
    

    // Redirect to home page
    router.push("/");
  };

  if (!acceptedRules || onboardingStep !== "complete") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
          {onboardingStep === "rules" && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                Community Guidelines
              </h3>
              <div className="prose text-sm mb-6 max-h-[60vh] overflow-y-auto">
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Respect all community members</li>
                  <li>Maintain confidentiality of shared information</li>
                  <li>No hate speech or discrimination</li>
                  <li>Keep conversations relevant and supportive</li>
                  <li>Report inappropriate behavior to moderators</li>
                </ol>
                <p className="mt-4 text-xs text-gray-500">
                  By continuing, you agree to these rules and confirm that all
                  conversations will be permanently stored for community safety.
                </p>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="acceptRules"
                  checked={acceptedRules}
                  onChange={(e) => setAcceptedRules(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="acceptRules" className="text-sm">
                  I accept the community guidelines
                </label>
              </div>
              <button
                onClick={acceptRules}
                disabled={!acceptedRules}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Accept & Continue
              </button>
            </>
          )}

          {onboardingStep === "auth" && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                Secure Participation
              </h3>
              <div className="space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Image
                    src="/google-icon.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>
                <button
                  onClick={() => setOnboardingStep("name")}
                  className="w-full px-4 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
                >
                  Continue Anonymously
                </button>
              </div>
            </>
          )}

          {onboardingStep === "name" && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                Choose Display Name
              </h3>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full p-3 border border-purple-200 rounded-lg mb-4"
                placeholder="Community Display Name"
              />
              <button
                onClick={() => handleNameChange(senderName)}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Name
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-purple-100">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-purple-700 hidden md:block">
            Community Chat
          </h2>
          <div className="hidden md:flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
            {communityGroups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeGroup === group
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                #{group}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center">
            {senderName.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm text-purple-600 font-medium">
            {senderName}
            {authUser && (
              <span className="text-xs text-purple-400 ml-1">✓</span>
            )}
          </span>
          {!authUser && (
            <button
              onClick={() => setShowNameModal(true)}
              className="p-2 hover:bg-purple-100 rounded-full text-purple-600"
            >
              ✎
            </button>
          )}
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-4 space-y-3 overflow-hidden">
        <div
          id="messages-container"
          className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-purple-200"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.userId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg ${
                  message.userId === userId
                    ? "bg-purple-600 text-white"
                    : "bg-white border border-purple-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">
                    {message.sender}
                    {message.isAuthenticated && (
                      <span className="text-xs ml-1">✓</span>
                    )}
                  </span>
                  <span className="text-xs opacity-75">
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-2 bg-white rounded-full shadow-lg"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #${activeGroup}...`}
            className="flex-1 px-4 py-2 text-sm bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700"
          >
            ➤
          </button>
        </form>
      </div>

      {/* Name Change Modal */}
      {showNameModal && !authUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Change Display Name</h3>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Enter your name"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowNameModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleNameChange(senderName)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
