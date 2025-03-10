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
      const sessionUser = sessionStorage.getItem("user");
      
      // Check if user is authenticated or if there's data in sessionStorage
      if (!user && !sessionUser) {
        router.push("/Wc"); // Redirect to the login page if not authenticated
      } else {
        // If user is authenticated or session exists, set loading to false
        setLoading(false);
        // Optionally, store user data in sessionStorage if not already present
        if (user && !sessionUser) {
          sessionStorage.setItem("user", JSON.stringify(user));
        }
      }
    }
  }, [user, router]); // Runs whenever user or router changes

  // While loading, show a loading indicator or placeholder
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once authenticated, render the home page content
  return (
    <div>
      {/* Your protected home page content */}
      <h1>Welcome, {user?.displayName || "User"}</h1>
    </div>
  );
}

export default Home;
