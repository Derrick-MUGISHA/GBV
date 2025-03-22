"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Shield, Heart, HelpCircle } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Footer from "../Footer/page";
import Navigation from "../navigation/page";
// import { Button } from "@/components/ui/button";
// import { signOut } from "firebase/auth";


const heroTexts = [
  { 
    text: "Together, We Can End Gender-Based Violence",
    subtext: "Breaking the silence, empowering survivors"
  },
  { 
    text: "Hand in Hand, We Can Create Change",
    subtext: "Unity is our strongest weapon against violence"
  },
  { 
    text: "Your Voice Matters, Your Safety is Priority",
    subtext: "Support, protect, and heal"
  },
  { 
    text: "Compassion Drives Transformation",
    subtext: "Every story of resilience counts"
  }
];

const featuredServices = [
  {
    icon: Shield,
    title: "Anonymous Reporting",
    description: "Safe, confidential platform to share your experience"
  },
  {
    icon: Heart,
    title: "Comprehensive Support",
    description: "Connecting you with counseling, legal, and medical resources"
  },
  {
    icon: HelpCircle,
    title: "Community Awareness",
    description: "Education and prevention programs"
  }
];

function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Redirect only AFTER authentication state is determined
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  // Handle hero text animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Show loading animation instead of returning null
  if (loading) {
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

  // Prevent flashing for unauthenticated users
  if (!user) return null;


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <>
    <Navigation />
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.img
            src="https://www.dsw.org/wp-content/uploads/2023/12/END-gbv-1.jpg"
            alt="stop gender-based violence"
            className="absolute inset-0 w-full h-full object-cover filter brightness-50"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Dynamic Text Overlay */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentTextIndex}
            className="relative z-20 text-center px-4 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut" 
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ letterSpacing: "0px" }}
              animate={{ 
                letterSpacing: ["0px", "1px", "0px"],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {heroTexts[currentTextIndex].text}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {heroTexts[currentTextIndex].subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1, 
                delay: 0.7 
              }}
            >
              <a 
                href="#services" 
                className="bg-red-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 inline-flex items-center space-x-2 group"
              >
                <span>Explore Services</span>
                <ArrowDown 
                  className="ml-2 group-hover:animate-bounce" 
                  size={20} 
                />
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Featured Services Section */}
      <motion.section 
        id="services"
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          variants={itemVariants}
        >
          Our Comprehensive Support Services
        </motion.h2>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {featuredServices.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105"
              variants={itemVariants}
            >
              <motion.div 
                className="mx-auto mb-4 w-20 h-20 bg-red-50 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <service.icon 
                  className="text-red-600" 
                  size={48} 
                />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        {/* Understanding GBV Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Understanding Gender-Based Violence (GBV)
          </h2>
          <p className="text-gray-700 mb-4">
            Gender-Based Violence (GBV) is a global crisis affecting individuals
            across all demographics, especially women, girls, and marginalized
            groups. It refers to harmful acts directed at a person based on their
            gender identity and encompasses physical, sexual, psychological, and
            economic abuse. 
          </p>
          <p className="text-gray-700">
            This violence often arises from unequal power dynamics, cultural norms, 
            and systemic gender inequalities. GBV is a severe violation of human 
            rights with devastating consequences. Survivors often experience physical 
            injuries, mental health challenges such as anxiety and depression, 
            social isolation, and economic hardship.
          </p>
        </section>

        {/* Why We Must Act Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Why We Must Act
          </h2>
          <p className="text-gray-700 mb-4">
            The prevalence of GBV remains alarmingly high. Global statistics reveal 
            multiple forms of violence:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Physical Violence:</strong> Domestic violence, assault
            </li>
            <li>
              <strong>Sexual Violence:</strong> Rape, sexual harassment, human trafficking
            </li>
            <li>
              <strong>Emotional/Psychological Abuse:</strong> Verbal abuse, manipulation, threats
            </li>
            <li>
              <strong>Economic Abuse:</strong> Controlling access to financial resources
            </li>
          </ul>
          <p className="text-gray-700">
            Existing platforms and services for reporting and support often fall short, 
            failing to provide timely, anonymous, and comprehensive assistance. 
            It&apos;s time for a new solution—one that combines technology, innovation, 
            and empathy to give survivors the voice and support they need.
          </p>
        </section>

        {/* EchoSafe Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Introducing EchoSafe: A Lifeline for Survivors
          </h2>
          <p className="text-gray-700 mb-4">
            In response to these challenges, EchoSafe was born—a digital platform 
            designed to empower survivors of Gender-Based Violence by offering a 
            secure, anonymous space to report incidents and access critical resources.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Anonymous Reporting:</strong> Survivors can report incidents without revealing their identity
            </li>
            <li>
              <strong>AI-Based Case Prioritization:</strong> Ensures urgent cases are flagged for immediate response
            </li>
            <li>
              <strong>Multi-Channel Accessibility:</strong> Available via web, mobile app, and SMS
            </li>
            <li>
              <strong>Comprehensive Support Services:</strong> Access to legal aid, counseling, medical assistance, and shelters
            </li>
          </ul>
        </section>

        {/* Commitment Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Our Commitment
          </h2>
          <p className="text-gray-700 mb-4">
            We are committed to creating a future free from violence. Through EchoSafe, we aim to:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
            <li>Break the silence surrounding GBV and empower survivors to seek help</li>
            <li>Raise awareness and educate communities on recognizing and preventing GBV</li>
            <li>Connect survivors with life-saving services quickly and efficiently</li>
          </ol>
          <p className="text-gray-700">
            By combining innovation, advocacy, and compassion, we believe we can 
            create a world where survivors no longer suffer in silence, where 
            communities come together to protect the vulnerable, and where gender 
            equality is no longer just a dream but a reality.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Home;
