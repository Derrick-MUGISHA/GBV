// components/ProtectedRoute.tsx
"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true);
      // Add a small delay (e.g., 500ms) before redirecting
      setTimeout(() => {
        router.push("/");
      }, 100);
    }
  }, [user, loading, router]);

  if (loading || isRedirecting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full border-4 border-purple-500 rounded-full animate-spin-fast" />
          <div className="absolute w-full h-full border-4 border-pink-500 rounded-full animate-spin-slow left-2 top-2" />
          <div className="absolute w-full h-full border-4 border-yellow-400 rounded-full animate-spin-medium right-2 bottom-2" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-pink-600 animate-pulse">
              LOADING
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
