"use client"
import { motion } from 'framer-motion';
import Footer from "@/app/Footer/page";
import Navigation from "@/app/navigation/page";
import Image from 'next/image';

export default function HowItWorks() {
  const reportingSteps = [
    {
      title: "1. Recognize the Signs",
      content: "Identify different forms of GBV including physical, emotional, sexual, and economic abuse",
      icon: "🕵️♀️"
    },
    {
      title: "2. Ensure Safety",
      content: "Find a secure location and contact emergency services if in immediate danger",
      icon: "🛡️"
    },
    {
      title: "3. Document Evidence",
      content: "Securely record incidents with dates, details, and any supporting materials",
      icon: "📝"
    },
    {
      title: "4. Official Reporting",
      content: "File reports through authorized channels while maintaining confidentiality",
      icon: "📢"
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="relative bg-purple-900 text-white py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Understanding & Addressing GBV
            </motion.h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              A comprehensive guide to recognizing, reporting, and preventing gender-based violence
            </p>
          </div>
        </section>

        {/* Interactive GBV Education */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <h2 className="text-3xl font-bold text-purple-900 mb-6">
                  What Constitutes GBV?
                </h2>
                <div className="space-y-6">
                  {[
                    "Intimate partner violence",
                    "Sexual harassment & assault",
                    "Child marriage",
                    "Human trafficking",
                    "Psychological abuse",
                    "Economic deprivation"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-pink-500 rounded-full" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative h-96 rounded-3xl overflow-hidden"
              >
                <Image
                  src="/education/gbv-awareness.jpg"
                  alt="GBV Education"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reporting Process Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-16">
              Safe Reporting Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {reportingSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-purple-50 p-6 rounded-2xl relative overflow-hidden group"
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.content}</p>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Protocols */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 rounded-3xl p-8 text-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block mb-6"
              >
                <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold">
                  🚨 Immediate Assistance
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-red-700 mb-4">
                24/7 National GBV Hotline
              </h3>
              <p className="text-3xl font-mono text-red-900 mb-6">1-800-799-SAFE</p>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/emergency" className="bg-white p-4 rounded-xl hover:bg-red-100 transition-colors">
                  Emergency Shelter Locator
                </a>
                <a href="/legal" className="bg-white p-4 rounded-xl hover:bg-red-100 transition-colors">
                  Legal Assistance
                </a>
                <a href="/medical" className="bg-white p-4 rounded-xl hover:bg-red-100 transition-colors">
                  Medical Support
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Prevention & Support */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
              Prevention & Community Support
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Educational Programs",
                  content: "Workshops for schools and workplaces",
                  action: "Request Training"
                },
                {
                  title: "Policy Advocacy",
                  content: "Support legislative reforms",
                  action: "Join Coalition"
                },
                {
                  title: "Survivor Support",
                  content: "Counseling and rehabilitation services",
                  action: "Access Resources"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl shadow-lg"
                >
                  <div className="text-purple-600 text-2xl mb-4">➔</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.content}</p>
                  <button className="text-pink-600 font-semibold">
                    {item.action} →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Confidential Reporting Assurance */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="bg-purple-100 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">
                Your Safety First
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                All reports are handled with strict confidentiality. We prioritize survivor 
                safety with secure communication channels and anonymous reporting options.
              </p>
              <div className="flex justify-center gap-6">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700">
                  Anonymous Report
                </button>
                <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50">
                  Learn About Privacy
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}