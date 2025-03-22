"use client"
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef} from 'react';
import Footer from "@/app/Footer/page";
import Navigation from "@/app/navigation/page";
import Image from 'next/image';

export default function Partnership() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-50% 0px" });
  const controls = useAnimation();

  const partnershipTiers = [
    {
      title: "Community Ally",
      color: "from-pink-400 to-purple-400",
      benefits: ["Logo placement", "Social media recognition", "Event invitations"]
    },
    {
      title: "Strategic Partner",
      color: "from-purple-500 to-blue-400",
      benefits: ["Co-branded campaigns", "Executive networking", "Impact reports"]
    },
    {
      title: "Leadership Circle",
      color: "from-blue-600 to-teal-400",
      benefits: ["Board participation", "Global recognition", "Custom programs"]
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
        {/* Animated Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <motion.div 
              className="absolute w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
            <motion.div 
              className="absolute w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30"
              animate={{
                x: [0, -150, 100, 0],
                y: [0, 50, -100, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </div>
          
          <div className="relative z-10 text-center px-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Power Change Together
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Join 150+ organizations creating systemic impact against gender-based violence
            </motion.p>
          </div>
        </motion.section>

        {/* Partnership Tiers */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-purple-900 text-center mb-16">
              Partnership Opportunities
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {partnershipTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br ${tier.color} p-1 rounded-3xl shadow-2xl`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-3xl p-8 h-full">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{tier.title}</h3>
                    <ul className="space-y-4 mb-6">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"/>
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="w-full bg-purple-600 text-white py-3 rounded-xl"
                    >
                      Explore Partnership
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Benefits Grid */}
        <section className="py-20 bg-purple-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Partnership Benefits</h2>
            <div className="grid md:grid-cols-12 gap-6">
              {[
                { title: "Impact Amplification", col: "col-span-4" },
                { title: "Employee Engagement", col: "col-span-8" },
                { title: "Thought Leadership", col: "col-span-5" },
                { title: "Brand Visibility", col: "col-span-7" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`${item.col} bg-white p-8 rounded-3xl shadow-lg relative overflow-hidden group h-64`}
                  whileHover={{ y: -10 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Animated Success Stories */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Collaborative Impact</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {[1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                >
                  <div className="relative h-80">
                    <Image
                      src={`/partners/partner-${index}.jpg`}
                      alt="Success story"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent p-8 flex flex-col justify-end">
                      <motion.div
                        initial={{ y: 50 }}
                        whileInView={{ y: 0 }}
                        className="text-white"
                      >
                        <h3 className="text-2xl font-bold mb-2">Global Tech Corp</h3>
                        <p>Funded 20 shelters through our matched giving program</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Partnership Process */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Partnership Journey</h2>
            <div className="flex flex-col md:flex-row gap-8">
              {[
                { step: "1", title: "Discovery Call", desc: "Align our visions" },
                { step: "2", title: "Co-Create Plan", desc: "Design initiatives" },
                { step: "3", title: "Launch & Impact", desc: "Measure results" },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-purple-50 p-8 rounded-3xl text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Partnership Form */}
        <section className="py-20 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Start Your Partnership</h2>
              <form className="space-y-6">
                <div>
                  <label className="block mb-2">Organization Name</label>
                  <input 
                    type="text" 
                    title="Organization Name"
                    placeholder="Enter your organization name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-4 focus:ring-2 focus:ring-pink-300" 
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">Contact Email</label>
                    <input 
                      type="email" 
                      title="Contact Email"
                      placeholder="Enter your email address"
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-4" 
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      title="Phone Number"
                      placeholder="Enter your phone number"
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-4" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2">Partnership Interest</label>
                  <textarea 
                    rows={4}
                    title="Partnership Interest"
                    placeholder="Tell us about your partnership goals"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-4" 
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold"
                >
                  Begin Partnership Discussion
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}