"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiAlertTriangle, FiHeart, FiShield, FiBookOpen, FiHome } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import "./Hero2"
import Hero2 from './Hero2';

const HowItWorks = () => {
    const router = useRouter();
//   const controls = useAnimation();
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    showFeedback: false,
    selectedAnswer: null as number | null,
  });

  const handleEmergencyExit = () => {
    // Redirect to homepage and clear history
    window.location.replace('/');
  };
  const sections = [
    {
      title: "What is Gender-Based Violence?",
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Gender-based violence (GBV) refers to harmful acts directed at individuals based on their gender. 
            It includes physical, sexual, emotional, psychological, and economic abuse.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800 mb-2">Common Forms:</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>Domestic violence</li>
                <li>Sexual harassment</li>
                <li>Child marriage</li>
                <li>Human trafficking</li>
              </ul>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-800 mb-2">Statistics:</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>1 in 3 women experience physical/sexual violence</li>
                <li>Only 40% seek help</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Cycle of Violence",
      icon: <FiHeart className="w-6 h-6" />,
      content: (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {['Tension Building', 'Acute Violence', 'Honeymoon'].map((stage, index) => (
              <motion.div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-md w-full text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`h-2 w-full mb-2 rounded-full ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-red-500' : 'bg-green-400'}`} />
                <h4 className="font-bold mb-2">{stage}</h4>
                <p className="text-sm">
                  {index === 0 && "Increased stress, verbal abuse"}
                  {index === 1 && "Physical/sexual violence outbreak"}
                  {index === 2 && "Apologies, promises to change"}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-600 italic">
            Understanding this pattern helps recognize abusive situations early
          </p>
        </motion.div>
      )
    },
    {
      title: "Prevention & Solutions",
      icon: <FiShield className="w-6 h-6" />,
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Individual Actions</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                Educate yourself about healthy relationships
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                Support survivors without judgment
              </li>
            </ul>
          </div>
          
          <div className="bg-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-pink-800 mb-4">Community Solutions</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-pink-600">✓</span>
                Advocate for comprehensive GBV laws
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">✓</span>
                Support local women&apos;s shelters
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const quizQuestions = [
    {
      question: "Which is a form of GBV?",
      options: ["Emotional abuse", "Friendly debate", "Sports competition"],
      correct: 0,
      feedback: {
        correct: "Correct! Emotional abuse is a common form of GBV.",
        incorrect: "Incorrect. GBV includes emotional, physical, and sexual abuse."
      }
    },
    {
      question: "What should you do if someone discloses abuse?",
      options: ["Blame them", "Listen supportively", "Share their story"],
      correct: 1,
      feedback: {
        correct: "Well done! Supportive listening is crucial.",
        incorrect: "Incorrect. Always listen without judgment and offer support."
      }
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === quizQuestions[quizState.currentQuestion].correct;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));

    setTimeout(() => {
      setQuizState(prev => ({
        ...prev,
        showFeedback: false,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null
      }));
    }, 2000);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: { scale: 1.05, transition: { yoyo: Infinity, duration: 1.5 } }
  };
  return (
    <>
    <Hero2 />
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-16 space-y-12"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={sectionVariants}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <motion.button
              className="w-full p-6 text-left flex justify-between items-center hover:bg-purple-50"
              onClick={() => setOpenSection(openSection === index ? null : index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <motion.span
                  animate={openSection === index ? { rotate: 360 } : { rotate: 0 }}
                  className="text-purple-600"
                >
                  {section.icon}
                </motion.span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <FiChevronDown className={`w-6 h-6 transition-transform ${
                openSection === index ? 'rotate-180' : ''
              }`} />
            </motion.button>

            <AnimatePresence>
              {openSection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-6"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Interactive Quiz */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8"
          variants={sectionVariants}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiBookOpen className="text-pink-600 animate-pulse" />
            Knowledge Check
          </h2>

          {quizState.currentQuestion < quizQuestions.length ? (
            <div className="space-y-6">
              <motion.p
                key={`question-${quizState.currentQuestion}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-semibold"
              >
                {quizQuestions[quizState.currentQuestion].question}
              </motion.p>

              <div className="grid gap-4">
                {quizQuestions[quizState.currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    className={`p-3 text-left rounded-lg border transition-colors
                      ${quizState.selectedAnswer === idx
                        ? idx === quizQuestions[quizState.currentQuestion].correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'}
                    `}
                    onClick={() => handleAnswer(idx)}
                    disabled={quizState.showFeedback}
                    whileHover={{ scale: quizState.showFeedback ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {quizState.showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-lg ${
                      quizState.selectedAnswer === quizQuestions[quizState.currentQuestion].correct
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {quizState.selectedAnswer === quizQuestions[quizState.currentQuestion].correct
                      ? quizQuestions[quizState.currentQuestion].feedback.correct
                      : quizQuestions[quizState.currentQuestion].feedback.incorrect}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-center py-8"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                Quiz Complete! Score: {quizState.score}/{quizQuestions.length}
              </h3>
              <button
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
                onClick={() => setQuizState({
                  currentQuestion: 0,
                  score: 0,
                  showFeedback: false,
                  selectedAnswer: null
                })}
              >
                Retake Quiz
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 text-center"
          variants={sectionVariants}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-bold mb-4">Take Action Now</h2>
          <motion.div className="flex flex-wrap justify-center gap-4">
            <motion.button
              className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Safety Plan
            </motion.button>
            <motion.button
              className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/resources')}
            >
              Find Local Resources
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Safety Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-purple-900 text-white py-8 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.p
            className="text-lg mb-4"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <strong>Remember:</strong> Your safety is our priority
          </motion.p>
          <motion.button
        className="fixed top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-lg z-50 flex items-center gap-2"
        onClick={handleEmergencyExit}
        variants={pulseVariants}
        initial="initial"
        animate="pulse"
      >
        <FiHome className="w-4 h-4" />
         Exit
      </motion.button>
        </div>
      </motion.div>
    </div>
    </>
  );
  
};

export default HowItWorks;