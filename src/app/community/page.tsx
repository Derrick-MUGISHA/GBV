"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { 
  collection, 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  onSnapshot
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import CommunitySkeleton from "@/components/ui/CommunitySkeleton";

interface Community {//+
  id: string;//+
  name: string;//+
  description: string;//+
  members: string[];//+
}//

export default function CommunityPage() {
  const [user] = useAuthState(auth);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCommunities, setUserCommunities] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribeCommunities = onSnapshot(
      collection(db, "communities"),
      (snapshot) => {
        const communitiesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Community[];
        setCommunities(communitiesData);
        setLoading(false);
      }
    );

    const unsubscribeUser = onSnapshot(
      doc(db, "users", user.uid),
      (doc) => {
        setUserCommunities(doc.data()?.communities || []);
      }
    );

    return () => {
      unsubscribeCommunities();
      unsubscribeUser();
    };
  }, [user]);

  const handleCommunityAction = async (communityId: string, action: "join" | "leave") => {
    if (!user) return;

    try {
      const communityRef = doc(db, "communities", communityId);
      const userRef = doc(db, "users", user.uid);
      
      await updateDoc(communityRef, {
        members: action === "join" ? arrayUnion(user.uid) : arrayRemove(user.uid)
      });

      await updateDoc(userRef, {
        communities: action === "join" ? arrayUnion(communityId) : arrayRemove(communityId)
      });
    } catch (error) {
      console.error(`Error ${action}ing community:`, error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Please login to access the community</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Community Hub</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {loading ? (
          <CommunitySkeleton />
        ) : communities.map((community) => (
          <div key={community.id} className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{community.name}</h2>
            <p className="text-gray-600 mb-4">{community.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {community.members.length} members
              </span>
              {userCommunities.includes(community.id) ? (
                <Button 
                  variant="destructive"
                  onClick={() => handleCommunityAction(community.id, "leave")}
                >
                  Leave
                </Button>
              ) : (
                <Button 
                  variant="default"
                  onClick={() => handleCommunityAction(community.id, "join")}
                >
                  Join
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}