"use client";
import { useEffect, useState, use } from "react"; // Added `use` import
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { doc, collection, query, orderBy, addDoc, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Post from "@/components/ui/Post";
import { CommunityPost } from "@/app/types/types";

interface Community {
  id: string;
  name: string;
  description: string;
  members: string[];
}


// Add a type fro the params object

type ParamsType = {
  id: string;
}
export default function CommunityPage({ params }: { params: { id: string } }) {
  const { id } = use(params) as { id: string }; // Unwrapped params
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState("");
  const [community, setCommunity] = useState<Community | null>(null);

  useEffect(() => {
    if (!id) return;

    // Fetch community data
    const communityRef = doc(db, "communities", id); // Changed to `id`
    const unsubscribeCommunity = onSnapshot(communityRef, (doc) => {
      if (doc.exists()) {
        setCommunity({ id: doc.id, ...doc.data() } as Community);
      } else {
        setCommunity(null);
      }
    });

    // Fetch posts
    const postsQuery = query(
      collection(db, `communities/${id}/posts`), // Changed to `id`
      orderBy("createdAt", "desc")
    );

    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CommunityPost[];
      setPosts(postsData);
    });

    return () => {
      unsubscribeCommunity();
      unsubscribePosts();
    };
  }, [id]); // Dependency updated to `id`

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !community || !newPost.trim()) return;

    try {
      await addDoc(collection(db, `communities/${id}/posts`), { // Changed to `id`
        content: newPost,
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        communityId: id, // Changed to `id`
        createdAt: new Date(),
        likes: [],
        comments: []
      });
      setNewPost("");
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  if (!community) return <div>Loading community...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{community.name}</h1>
      <p className="text-gray-600 mb-8">{community.description}</p>

      {user && community.members.includes(user.uid) && (
        <form onSubmit={handlePostSubmit} className="mb-8">
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="mb-4 h-32"
          />
          <Button type="submit">Post to Community</Button>
        </form>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} communityId={id} />
        ))}
      </div>
    </div>
  );
}