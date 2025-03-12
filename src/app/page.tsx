// pages/index.tsx
"use client"
import Link from 'next/link';
import Navigation from '@/app/navigation/page';
import Footer from '@/app/Footer/page';

export default function Home() {
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
              <Link href="/join" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-transform transform hover:scale-105">
                Join the Movement
              </Link>
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
