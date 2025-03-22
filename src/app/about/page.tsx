"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Users,
  Lightbulb,
  HandHelping,
} from "lucide-react";
import Footer from "../Footer/page";
import Navigation from "../navigation/page";
import Image from "next/image";

const About = () => {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  const coreValues = [
    {
      icon: Heart,
      title: "Empathy and Compassion",
      description:
        "We prioritize the well-being of survivors, treating them with kindness and understanding.",
    },
    {
      icon: ShieldCheck,
      title: "Confidentiality and Privacy",
      description:
        "Protecting survivors' data and identities is our top priority. We maintain the highest standards of security and confidentiality.",
    },
    {
      icon: Users,
      title: "Collaboration and Community",
      description:
        "We believe in the power of working together with communities, NGOs, and law enforcement to create real change.",
    },
    {
      icon: Lightbulb,
      title: "Innovation and Accessibility",
      description:
        "Leveraging technology to provide accessible solutions for survivors, especially in underserved areas.",
    },
    {
      icon: HandHelping,
      title: "Empowerment and Advocacy",
      description:
        "We empower survivors to take control of their lives and advocate for policies that protect their rights.",
    },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[50vh] overflow-hidden"
        >
          <Image
            src="https://jwbfamilylaw.com/wp-content/uploads/2023/10/Where-can-you-find-a-trustworthy-domestic-violence-lawyer-in-San-Diego-CA.jpg"
            alt="About Us"
            fill
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <motion.blockquote
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="italic text-xl md:text-2xl max-w-2xl mx-auto"
              >
                &quot;You are not alone, there is help and hope for a better
                tomorrow.&quot;
              </motion.blockquote>
            </div>
          </div>
        </motion.div>

        {/* Mission and Vision */}
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-3xl font-bold text-violet-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700">
              To end gender-based violence by advocating for women&apos;s and
              girls&apos; rights, ensuring equality through education, and
              empowering survivors to seek justice and support.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-3xl font-bold text-violet-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700">
              A world where everyone can live free from violence, with access to
              the support and resources they need to thrive.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-violet-600 mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-purple-50 p-6 rounded-lg shadow-md transition-all duration-300 
                  ${activeValue === index ? "ring-4 ring-violet-300" : ""}`}
                  onClick={() =>
                    setActiveValue(
                      activeValue === index ? null : (index as number | null)
                    )
                  }
                >
                  <div className="flex items-center mb-4">
                    <value.icon className="text-violet-500 mr-4" size={40} />
                    <h3 className="text-xl font-semibold text-violet-700">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-indigo-500/10 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-violet-600 mb-12">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: "1,000+",
                  description:
                    "Survivors provided with professional guidance to help them reclaim their lives and rights.",
                },
                {
                  number: "20,000+",
                  description:
                    "People reached through awareness campaigns, breaking the stigma around Gender-Based Violence.",
                },
                {
                  number: "10",
                  description:
                    "Partner organizations collaborating to combat GBV, amplifying our collective impact.",
                },
              ].map((impact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.3, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center"
                >
                  <div className="text-5xl font-bold text-violet-600 mb-4">
                    {impact.number}
                  </div>
                  <p className="text-gray-700">{impact.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
