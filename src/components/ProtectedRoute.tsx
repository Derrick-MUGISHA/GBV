"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  // Ensure component is mounted before rendering
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Redirect after Firebase loads
  useEffect(() => {
    if (hydrated && !loading) {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    }
  }, [user, loading, router, hydrated]);

  // 🔄 Show animation while checking auth
  if (!hydrated || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full border-4 border-purple-500 rounded-full animate-spin-fast" />
          <div className="absolute w-full h-full border-4 border-pink-500 rounded-full animate-spin-slow left-2 top-2" />
          <div className="absolute w-full h-full border-4 border-yellow-400 rounded-full animate-spin-medium right-2 bottom-2" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white animate-pulse">
              LOADING...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
