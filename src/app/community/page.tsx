"use client";
import { useEffect, useState } from 'react';
import { database as db, ref, push, onValue, off, serverTimestamp, set, get } from '@/app/firebase/config';
import { Message, ChatGroup, UserProfile } from '@/app/types/chat';
import { v4 as uuidv4 } from 'uuid';

export default function ChatInterface() {
  const [activeGroup, setActiveGroup] = useState<ChatGroup['id']>('Rwanda');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('Anonymous'); // Ensure initialized with a string value
  const [showNameModal, setShowNameModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsInitialized] = useState(false); // Add tracking for initialization

  // Generate or retrieve user ID and name from localStorage on client-side only
  useEffect(() => {
    // Generate or retrieve persistent user ID
    const storedUserId = localStorage.getItem('chatUserId');
    const newUserId = storedUserId || uuidv4();
    
    if (!storedUserId) {
      localStorage.setItem('chatUserId', newUserId);
    }
    
    setUserId(newUserId);
    
    // Get stored username if available
    const storedName = localStorage.getItem('chatUserName');
    if (storedName) {
      setSenderName(storedName);
    }
    
    // Check if user exists in database
    const checkUserProfile = async () => {
      try {
        const userRef = ref(db, `users/${newUserId}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          // User exists, update last seen
          const userData = snapshot.val() as UserProfile;
          // Only update if we have a valid display name
          if (userData.displayName) {
            setSenderName(userData.displayName);
          }
          
          // Update last seen timestamp
          await set(ref(db, `users/${newUserId}/lastSeen`), serverTimestamp());
        } else {
          // Create new user profile
          await set(ref(db, `users/${newUserId}`), {
            displayName: storedName || 'Anonymous',
            createdAt: serverTimestamp(),
            lastSeen: serverTimestamp(),
            groups: {
              [activeGroup]: true
            }
          });
        }
        
        // Mark initialization as complete
        setIsInitialized(true);
      } catch (error) {
        console.error("Error checking user profile:", error);
        // Still mark as initialized even on error
        setIsInitialized(true);
      }
    };
    
    checkUserProfile();
  }, [activeGroup]); // Include activeGroup in dependencies since it's used in the effect

  // Generate avatar with persisted name and color based on userId
  const generateAvatar = (name: string = 'Anonymous', id: string = userId) => {
    // Ensure name is a string before calling slice
    const safeName = name || 'Anonymous';
    const initials = safeName.slice(0, 2).toUpperCase();
    
    // Generate consistent color based on user ID
    const colorHash = id.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const hue = Math.abs(colorHash % 360);
    const backgroundColor = `hsl(${hue}, 70%, 50%)`;
    
    return (
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium shadow-sm"
        style={{ backgroundColor }}
      >
        {initials}
      </div>
    );
  };

  // Real-time message listener
  useEffect(() => {
    // Only set up listeners if userId exists
    if (!userId) return;
    
    setIsLoading(true);
    const messagesRef = ref(db, `community/groups/${activeGroup}/messages`);
    
    // Update user's active groups
    set(ref(db, `users/${userId}/groups/${activeGroup}`), true);
    
    const handleMessages = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val() || {};
      const formattedMessages = Object.entries(messagesData).map(([id, msgData]) => {
        // Fix TypeScript issue by properly typing the msgData
        const msg = msgData as {
          sender: string;
          text: string;
          timestamp: number;
          userId: string;
        };
        
        return {
          id,
          sender: msg.sender || 'Anonymous', // Provide default value
          text: msg.text || '', // Provide default value
          timestamp: msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }) : '--:--',
          userId: msg.userId || 'unknown'
        };
      });
      
      // Sort messages by timestamp (newest last)
      const sortedMessages = formattedMessages.sort((a, b) => {
        const timeA = new Date(messagesData[a.id]?.timestamp || 0).getTime();
        const timeB = new Date(messagesData[b.id]?.timestamp || 0).getTime();
        return timeA - timeB;
      });
      
      setMessages(sortedMessages);
      setIsLoading(false);
      
      // Auto-scroll to bottom when messages change
      scrollToBottom();
    });

    // Properly use the unsubscribe function
    return () => {
      handleMessages();
      off(messagesRef);
    };
  }, [activeGroup, userId]);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;

    try {
      // Update user's last activity timestamp
      await set(ref(db, `users/${userId}/lastSeen`), serverTimestamp());
      
      // Send message with userId for tracking
      await push(ref(db, `community/groups/${activeGroup}/messages`), {
        sender: senderName,
        text: newMessage,
        timestamp: Date.now(),
        userId: userId
      });
      
      setNewMessage('');
      
      // Auto-scroll to bottom after sending
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleNameChange = async (newName: string) => {
    const trimmedName = newName.trim();
    if (trimmedName) {
      setSenderName(trimmedName);
      localStorage.setItem('chatUserName', trimmedName);
      
      // Update username in database to track user across sessions
      if (userId) {
        try {
          await set(ref(db, `users/${userId}/displayName`), trimmedName);
        } catch (error) {
          console.error('Error updating user display name:', error);
        }
      }
    }
    setShowNameModal(false);
  };

  // Add more community groups for a more professional structure
  const communityGroups: ChatGroup['id'][] = ['Rwanda', 'General', 'Help', 'Announcements', 'Resources', 'Others'];

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white">
      {/* Header with improved responsive design */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-purple-100">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-purple-700 hidden md:block">Community Chat</h2>
          
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-purple-100 text-purple-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle channel menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="h-5 border-r border-gray-300 hidden md:block"></div>
          
          {/* Desktop channel selector */}
          <div className="hidden md:flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
            {communityGroups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                  activeGroup === group
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                #{group}
              </button>
            ))}
          </div>
          
          {/* Mobile current channel display */}
          <div className="md:hidden flex items-center">
            <span className="text-purple-700 font-medium">#{activeGroup}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {generateAvatar(senderName)}
          <span className="text-sm text-purple-600 font-medium hidden sm:inline-block">{senderName}</span>
          <button
            onClick={() => setShowNameModal(true)}
            className="p-2 hover:bg-purple-100 rounded-full text-purple-600"
            aria-label="Edit display name"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile channel selector dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-purple-100 px-4 py-3 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Channels</h3>
          <div className="grid grid-cols-2 gap-2">
            {communityGroups.map((group) => (
              <button
                key={group}
                onClick={() => {
                  setActiveGroup(group);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all text-left ${
                  activeGroup === group
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                #{group}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Name Change Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-purple-700">Change Display Name</h3>
            <p className="text-sm text-gray-500 mb-4">
              This name will appear to others in the chat.
            </p>
            <input
              type="text"
              value={senderName || ''} // Add fallback for controlled input
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full p-3 border border-purple-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
            <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <button
                onClick={() => setShowNameModal(false)}
                className="order-2 sm:order-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleNameChange(senderName)}
                className="order-1 sm:order-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container with improved responsive design */}
      <div className="flex-1 flex flex-col p-2 sm:p-4 space-y-3 overflow-hidden">
        {/* Group Info Banner */}
        <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-purple-700 mb-1">#{activeGroup}</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {messages.length} messages
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Welcome to the {activeGroup} community! Please be respectful and follow our community guidelines.
          </p>
        </div>
        
        {/* Messages Area with improved loading state */}
        <div 
          id="messages-container"
          className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-sm mt-2">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => {
              // Group consecutive messages from the same user
              const isSameUserAsPrevious = index > 0 && message.userId === messages[index - 1].userId;
              
              return (
                <div 
                  key={message.id} 
                  className={`flex items-start gap-3 ${
                    message.userId === userId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Other Users (Left Side) - only show avatar for first message in a group */}
                  {message.userId !== userId && (!isSameUserAsPrevious ? (
                    generateAvatar(message.sender, message.userId)
                  ) : (
                    <div className="w-10 opacity-0"></div> // Spacer for alignment
                  ))}

                  {/* Message Bubble */}
                  <div 
                    className={`max-w-[85%] sm:max-w-[75%] ${
                      message.userId === userId 
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-purple-100'
                    } p-3 rounded-lg ${
                      isSameUserAsPrevious && message.userId === messages[index - 1].userId
                        ? message.userId === userId ? 'rounded-tr-sm' : 'rounded-tl-sm'
                        : ''
                    } shadow-sm`}
                  >
                    {/* Only show sender name for first message in a group */}
                    {!isSameUserAsPrevious && (
                      <div className={`flex items-center gap-2 mb-1 ${
                        message.userId === userId ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className={`text-sm font-semibold ${
                          message.userId === userId ? 'text-purple-100' : 'text-purple-700'
                        }`}>
                          {message.sender}
                        </span>
                        <span className={`text-xs ${
                          message.userId === userId ? 'text-purple-200' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </span>
                      </div>
                    )}
                    
                    <p className={`text-sm leading-relaxed ${
                      message.userId === userId ? 'text-white' : 'text-gray-800'
                    }`}>
                      {message.text}
                    </p>
                  </div>

                  {/* Current User (Right Side) - only show avatar for first message in a group */}
                  {message.userId === userId && (!isSameUserAsPrevious ? (
                    generateAvatar(message.sender)
                  ) : (
                    <div className="w-10 opacity-0"></div> // Spacer for alignment
                  ))}
                </div>
              );
            })
          )}
        </div>

        {/* Input Area with improved responsive design */}
        <form 
          onSubmit={handleSend} 
          className="flex items-center gap-2 sm:gap-3 p-2 bg-white rounded-full shadow-lg border border-purple-100"
        >
          <div className="flex-shrink-0 hidden sm:block">
            {generateAvatar(senderName)}
          </div>
          
          <input
            type="text"
            value={newMessage} // Already controlled properly
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #${activeGroup}...`}
            className="flex-1 px-3 sm:px-4 py-2 text-sm bg-gray-50 rounded-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none placeholder-gray-400"
          />
          
          <button
            type="submit"
            disabled={!newMessage.trim() || isLoading}
            className={`w-10 h-10 flex items-center justify-center ${
              newMessage.trim() && !isLoading ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-300'
            } text-white rounded-full transition-colors shadow-sm`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}