"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase/config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { CommunityPost } from "@/app/types/types";
import CommentSection from "@/components/ui/CommentSection";
import { Button } from "./button";

export default function Post({ post, communityId }: { post: CommunityPost; communityId: string }) {
  const [user] = useAuthState(auth);

  const handleLike = async () => {
    if (!user) return;
    
    const postRef = doc(firestore, `communities/${communityId}/posts`, post.id);
    await updateDoc(postRef, {
      likes: post.likes.includes(user.uid) 
        ? arrayRemove(user.uid) 
        : arrayUnion(user.uid)
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div>
          <h3 className="font-semibold">{post.authorName}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <p className="mb-4">{post.content}</p>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={handleLike} disabled={!user}>
          ❤️ {post.likes.length}
        </Button>
      </div>

      <CommentSection post={post} communityId={communityId} />
    </div>
  );
}
