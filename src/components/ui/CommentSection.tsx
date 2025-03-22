"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase/config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { CommunityPost } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CommentSection({ post, communityId }: { 
  post: CommunityPost; 
  communityId: string 
}) {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async () => {
    if (!user || !comment.trim()) return;

    const postRef = doc(firestore, `communities/${communityId}/posts`, post.id);
    await updateDoc(postRef, {
      comments: arrayUnion({
        userId: user.uid,
        content: comment,
        createdAt: new Date().toISOString()
      })
    });
    setComment("");
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-4">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button onClick={handleCommentSubmit}>Post</Button>
      </div>

      <div className="space-y-3">
        {post.comments.map((comment, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm">{comment.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
