"use client"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import Footer from "@/app/Footer/page";
import Navigation from "@/app/navigation/page";
import Image from 'next/image';

export default function GetStarted() {
  const [activeStep, setActiveStep] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  const steps = [
    { title: "Recognize", content: "Identify warning signs and patterns" },
    { title: "Respond", content: "Learn safe intervention methods" },
    { title: "Report", content: "Know your reporting options" },
    { title: "Recover", content: "Access support resources" },
  ];

  const quizQuestions = [
    {
      question: "Which of these is a form of GBV?",
      options: ["Verbal abuse", "Economic control", "Digital harassment", "All above"],
      correct: 3
    },
    // Add more questions
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <Navigation />
      <div ref={ref} className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100">
        {/* Interactive Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-purple-900 text-white py-24 px-4 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              Take Action Against GBV
            </motion.h1>
            <p className="text-xl mb-8">Empower yourself with knowledge and tools</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-pink-500 px-8 py-3 rounded-full"
            >
              Start Learning
            </motion.button>
          </div>
        </motion.section>

        {/* Interactive Roadmap */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">
              Your Action Roadmap
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer ${
                    activeStep === index ? 'bg-purple-600 text-white' : 'bg-white'
                  }`}
                  whileHover={{ y: -10 }}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="text-4xl mb-4">0{index + 1}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p>{step.content}</p>
                </motion.div>
              ))}
            </div>

            {/* Step Content */}
            <motion.div 
              className="mt-12 bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {activeStep === 0 && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Warning Signs</h3>
                    <ul className="list-disc pl-6 space-y-4">
                      <li>Physical aggression or threats</li>
                      <li>Controlling behavior patterns</li>
                      <li>Digital monitoring/stalking</li>
                    </ul>
                  </div>
                  <Image 
                    src="/education/signs.png" 
                    alt="Warning signs"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              )}
              {/* Add other step contents */}
            </motion.div>
          </div>
        </section>

        {/* Interactive Quiz */}
        <section className="py-16 bg-pink-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Test Your Knowledge</h3>
              <div className="mb-4">
                <div className="h-2 bg-purple-100 rounded-full">
                  <div 
                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${(quizProgress + 1) * 25}%` }}
                  />
                </div>
              </div>
              {quizQuestions.map((question, index) => (
                <div key={index} className="space-y-4">
                  <p className="text-xl font-medium">{question.question}</p>
                  <div className="grid gap-4">
                    {question.options.map((option, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ x: 10 }}
                        className="text-left p-4 rounded-xl border border-purple-200"
                        onClick={() => setQuizProgress(quizProgress + 1)}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Resources */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="bg-red-500 text-white p-8 rounded-2xl shadow-xl"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <h2 className="text-3xl font-bold mb-4">Emergency Assistance</h2>
              <p className="text-xl mb-4">24/7 National Hotline: 1-800-799-SAFE</p>
              <button className="bg-white text-red-500 px-6 py-2 rounded-full">
                Immediate Help
              </button>
            </motion.div>
          </div>
        </section>

        {/* Resource Library */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Learning Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['Safety Planning Guide', 'Legal Rights Handbook', 'Support Networks Map'].map((resource, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ y: -10 }}
                >
                  <div className="h-40 bg-purple-100 rounded-xl mb-4" />
                  <h3 className="text-xl font-bold mb-2">{resource}</h3>
                  <button className="text-purple-600 flex items-center">
                    Download Resource
                    <span className="ml-2 text-xl">→</span>
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