"use client";

import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiUsers,
  FiMessageCircle,
  FiActivity
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';

const HeroSection = () => {
  const router = useRouter();
  const [user] = useAuthState(auth)

  // Navigation handler functions
  const handleNavigation = (path: string) => {
    if (!user) {
      router.push('/');
    } else {
      router.push(path);
    }
  };

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
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight pt-16 sm:pt-0"
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard icon={<FiUsers />} number="50K+" label="Community Members" />
            <StatCard icon={<FiShield />} number="24/7" label="AI Protection Monitoring" />
            <StatCard icon={<FiMessageCircle />} number="10K+" label="Daily Support Chats" />
            <StatCard icon={<FiActivity />} number="85%" label="Successful Interventions" />
          </motion.div>

          {/* Navigation Buttons - Responsive and Functional */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Link version for better SEO */}
            <button 
              onClick={() => handleNavigation('/community')}
              className="w-full bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Join Our Community</span>
              <FiUsers className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => handleNavigation('/ai')}
              className="w-full bg-white text-purple-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-purple-100 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Chat with AI Guide</span>
              <FiMessageCircle className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
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