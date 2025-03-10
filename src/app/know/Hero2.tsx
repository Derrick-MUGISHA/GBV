"use client";
// import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiUsers,
  FiMessageCircle,
  FiActivity
} from 'react-icons/fi';
// import { useRouter } from 'next/navigation';

const HeroSection = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-700 to-purple-900"
        animate={{
          background: [
            'linear-gradient(to right, #4c1d95, #db2777, #4c1d95)',
            'linear-gradient(to right, #db2777, #4c1d95, #db2777)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%'
              }}
              animate={{
                y: [0, 100, 0],
                x: [0, 50, 0],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-6xl px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Break the Silence,<br />End the Violence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Gender-based violence is not just a women&apos;s issue - it&apos;s a human rights crisis. 
            Together, through community support, AI-powered tools, and collective action, 
            we can create a safer world for all.
          </motion.p>

          {/* Stats Counter */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <StatCard icon={<FiUsers />} number="50K+" label="Community Members" />
            <StatCard icon={<FiShield />} number="24/7" label="AI Protection Monitoring" />
            <StatCard icon={<FiMessageCircle />} number="10K+" label="Daily Support Chats" />
            <StatCard icon={<FiActivity />} number="85%" label="Successful Interventions" />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg hover:bg-pink-700 transition-all flex items-center gap-2">
              Join Our Community
              <FiUsers className="w-5 h-5" />
            </button>
            
            <button className="bg-white text-purple-900 px-8 py-3 rounded-full text-lg hover:bg-purple-100 transition-all flex items-center gap-2">
              Chat with AI Guide
              <FiMessageCircle className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
//   const router = useRouter();
//   const [openSection, setOpenSection] = useState<number | null>(0);
//   const [quizState, setQuizState] = useState({
//     currentQuestion: 0,
//     score: 0,
//     showFeedback: false,
//     selectedAnswer: null as number | null,
//   });

  // ... (keep the existing sections and quizQuestions arrays)

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Emergency Exit Button */}
      {/* <motion.button
        className="fixed top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-lg z-50 flex items-center gap-2 shadow-lg hover:bg-pink-700 transition-colors"
        onClick={handleEmergencyExit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiHome className="w-4 h-4" />
        Emergency Exit
      </motion.button> */}

      {/* How It Works Content */}
      <div className="bg-gradient-to-b from-purple-50 to-pink-50">
        {/* ... (keep the existing HowItWorks content structure) */}
      </div>
    </div>
  );
};

const StatCard = ({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) => (
  <motion.div
    className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm text-black"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-2xl font-bold mb-1">{number}</div>
    <div className="text-sm opacity-80">{label}</div>
  </motion.div>
);

export default HowItWorks;