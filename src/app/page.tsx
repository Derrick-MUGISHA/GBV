"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navigation from "@/app/navigation/page";
import Footer from "@/app/Footer/page";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  // Prevent hydration errors
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Redirect logged-in users before showing anything
  useEffect(() => {
    if (hydrated && !loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router, hydrated]);

  // 🔄 While loading, show nothing to avoid a flicker
  if (!hydrated || loading || user) {
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

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-[url('/gbv-bg.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-purple-900/20"></div>

          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              End Gender-Based Violence <span className="block text-3xl mt-4 text-pink-400">Together We Can Make A Difference</span>
            </h1>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-pink-400">
              <p className="text-lg text-black italic">
                &quot;1 in 3 women worldwide experience physical or sexual violence. Join the movement to change this.&quot;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* <Link href="/join" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-transform transform hover:scale-105">
                Join the Movement
              </Link> */}
              <Link href="/know" className="bg-white hover:bg-purple-50 text-purple-600 font-semibold py-4 px-8 rounded-lg border-2 border-purple-400 transition-transform transform hover:scale-105">
                View all About us
              </Link>
            </div>

            <div className="mt-12 animate-bounce">
              <span className="text-pink-900 text-lg">Login or sign up to make a difference ↑</span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}