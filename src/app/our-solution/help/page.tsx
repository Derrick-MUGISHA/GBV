"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import Footer from "@/app/Footer/page";
import Navigation from "@/app/navigation/page";


export default function Help() {
    const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const supportMethods = [
    {
      title: "24/7 Crisis Chat",
      icon: "💬",
      description: "Immediate connection with trained specialists",
      action: "Start Chat"
    },
    {
      title: "Emergency Call",
      icon: "📞",
      description: "Direct line to local authorities",
      action: "Call Now"
    },
    {
      title: "Safe Email",
      icon: "✉️",
      description: "Encrypted communication channel",
      action: "Compose Email"
    }
  ];

  const faqItems = [
    {
      question: "How can I help someone experiencing GBV?",
      answer: "1. Believe them\n2. Ensure safety\n3. Provide resources\n4. Respect their decisions"
    },
    {
      question: "What evidence should I preserve?",
      answer: "Document dates, times, messages, injuries, and witness contacts"
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        {/* Emergency Banner */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-red-600 text-white py-4 text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="font-bold">🚨 In Immediate Danger?</span>
            <button className="bg-white text-red-600 px-4 py-1 rounded-full hover:bg-red-100">
              Click for Emergency Exit
            </button>
          </div>
        </motion.div>

        {/* Hero Section */}
        <section className="relative bg-purple-900 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              You&apos;re Not Alone
            </motion.h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Immediate support and confidential resources for survivors and allies
            </p>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
              Ways to Get Help
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {supportMethods.map((method, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center"
                >
                  <div className="text-5xl mb-6">{method.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{method.title}</h3>
                  <p className="text-gray-600 mb-6">{method.description}</p>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
                    {method.action}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Resource Finder */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
              Find Local Support
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-100 rounded-2xl p-6 h-96">
                {/* Map Integration Placeholder */}
                <div className="bg-purple-100 w-full h-full rounded-xl flex items-center justify-center">
                  🗺️ Service Locator Map
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4">Essential Resources</h3>
                  <div className="grid gap-4">
                    {['Shelters', 'Legal Aid', 'Counseling', 'Medical Care'].map((resource, i) => (
                      <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl">
                        <span>{resource}</span>
                        <button className="text-purple-600 hover:underline">
                          Find Nearby
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-pink-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
              Common Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-purple-50"
                  >
                    <span className="text-lg font-semibold">{item.question}</span>
                    <motion.span
                      animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 bg-white"
                    >
                      {item.answer.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-center text-purple-900 mb-8">
                Send Secure Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                    placeholder="Type your message here..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium">Email (optional)</label>
                    <input
                      type="email"
                      className="w-full p-4 rounded-xl border-2 border-purple-200"
                      title="Email input field"
                      placeholder="Enter your email address"
                      aria-label="Email input field"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Phone (optional)</label>
                    <input
                      type="tel"
                      className="w-full p-4 rounded-xl border-2 border-purple-200"
                      title="Phone input field"
                      placeholder="Enter your phone number"
                      aria-label="Phone input field"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold"
                >
                  Send Message Securely
                </motion.button>
              </form>
            </div>
          </div>
        </section>

        {/* Safety Planning */}
        <section className="py-16 bg-purple-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Safety Planning Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['Digital Security Guide', 'Emergency Kit Checklist', 'Safe Exit Strategy'].map((resource, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm"
                >
                  <div className="text-4xl mb-4">📘</div>
                  <h3 className="text-xl font-bold mb-2">{resource}</h3>
                  <button className="text-pink-300 hover:underline">
                    Download PDF
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}