"use client"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import Footer from "@/app/Footer/page";
import Navigation from "@/app/navigation/page";
import Image from 'next/image';

export default function Donate() {
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState('');
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle donation processing
  };

  const donationOptions = [
    { amount: 50, impact: 'Provides emergency shelter for 1 night' },
    { amount: 100, impact: 'Funds counseling sessions for 2 survivors' },
    { amount: 250, impact: 'Supports legal aid for 1 case' },
    { amount: 500, impact: 'Trains 5 community advocates' }
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        {/* Hero Section */}
        <motion.section 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="relative bg-gradient-to-r from-pink-600 to-purple-700 text-white py-24 px-4"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Empower Survivors Through Giving
            </motion.h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              92% of every dollar directly supports survivors and prevention programs
            </p>
          </div>
        </motion.section>

        {/* Impact Visualization */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 text-center mb-12">
              Your Donation Creates Change
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {donationOptions.map((option, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow-lg text-center"
                >
                  <div className="text-4xl font-bold text-pink-600 mb-4">
                    ${option.amount}
                  </div>
                  <p className="text-gray-600">{option.impact}</p>
                  <button 
                    className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                    onClick={() => setAmount(option.amount.toString())}
                  >
                    Select
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-16 px-4 bg-purple-50">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="bg-white rounded-3xl shadow-xl p-8"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">
                Make a Secure Donation
              </h2>

              {/* Donation Type Toggle */}
              <div className="flex justify-center mb-8">
                <button
                  className={`px-6 py-3 rounded-l-full ${
                    donationType === 'one-time' 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setDonationType('one-time')}
                >
                  One-Time
                </button>
                <button
                  className={`px-6 py-3 rounded-r-full ${
                    donationType === 'monthly' 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setDonationType('monthly')}
                >
                  Monthly
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Donation Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                    required
                    id="donationAmount"
                    placeholder="Enter amount"
                    aria-label="Donation amount in USD"
                  />
                </div>

                {/* Payment Details */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Card Information
                  </label>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-4 rounded-xl border-2 border-purple-200"
                      required
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <label className="sr-only" htmlFor="expiry">Expiration Date</label>
                      <input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        aria-label="Card expiration date"
                        className="p-4 rounded-xl border-2 border-purple-200"
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="p-4 rounded-xl border-2 border-purple-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Donor Info */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-4 rounded-xl border-2 border-purple-200"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-4 rounded-xl border-2 border-purple-200"
                    required
                  />
                </div>

                {/* Security Badges */}
                <div className="flex items-center justify-center space-x-4 mt-8">
                  <Image 
                    src="/security-icons/pci-dss.svg" 
                    alt="PCI DSS Compliant"
                    width={80}
                    height={40}
                  />
                  <Image 
                    src="/security-icons/ssl-secure.svg" 
                    alt="SSL Secure"
                    width={60}
                    height={40}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-700 transition-colors"
                >
                  Donate Now
                </motion.button>
              </form>
            </motion.div>

            {/* Alternative Donation Methods */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Other ways to give:</p>
              <div className="flex justify-center space-x-6">
                <button className="flex items-center bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <Image 
                    src="/payment-logos/paypal.svg" 
                    alt="PayPal"
                    width={80}
                    height={40}
                  />
                </button>
                <button className="flex items-center bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <Image 
                    src="/payment-logos/venmo.svg" 
                    alt="Venmo"
                    width={80}
                    height={40}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Deductible Info */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              Tax-Deductible Donations
            </h3>
            <p className="text-gray-600 mb-6">
  We are a registered nonprofit organization in Rwanda. Your contribution helps support 
  vital community initiatives and is eligible for tax deductions in accordance with Rwandan law.
</p>
<button className="text-pink-600 font-semibold hover:underline">
  You will Receipt Template in the Notification
</button>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
    }
