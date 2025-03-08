"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

function Home() {
  const [user] = useAuthState(auth); // Firebase auth state
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure this only runs in the client-side environment (browser)
    if (typeof window !== "undefined") {
      // If no user is authenticated or sessionStorage has no user data, redirect to '/Wc'
      if (!user && !sessionStorage.getItem("user")) {
        router.push("/Wc"); // Redirect to the desired page if not authenticated
      } else {
        setLoading(false);
      }
    }
  }, [user, router]); // Runs whenever user or router changes

  // Show loading while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once authenticated, render the home page content
  return (
    <div>
      <Home />
      {/* Your protected home page content */}
    </div>
  );
}

export default Home;
