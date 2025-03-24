"use client"
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Head from 'next/head';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Navigation from '@/app/navigation/page';
import Footer from '@/app/Footer/page';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const cardVariants = {
  hover: { scale: 1.02, y: -10 },
  tap: { scale: 0.98 },
};

interface VolunteerFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export default function Volunteer() {
  const { register, handleSubmit, formState: { errors } } = useForm<VolunteerFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Intersection Observer animations
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (heroInView) {
      controls.start("visible");
    }
  }, [controls, heroInView]);

  const onSubmit = async (data: VolunteerFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call with form data
      await new Promise((resolve) => {
        console.log('Form data:', data);
        setTimeout(resolve, 2000);
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Head>
        <title>Join the Movement - End Gender Violence</title>
        <meta name="description" content="Become an active advocate against gender-based violence through volunteering, education, and community action" />
      </Head>

      {/* Animated Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
        className="relative bg-gradient-to-br from-pink-600 to-purple-700 text-white py-24 px-4"
      >
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-200">
              Empower Change
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Join 2,500+ advocates transforming lives through direct action, education, and policy reform
          </motion.p>
          <motion.span
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
>
  Start Your Journey
</motion.span>

        </div>
      </motion.section>

      {/* Interactive Impact Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-900 text-center mb-12">Our Collective Progress</h2>
          <div className="flex overflow-x-scroll pb-8 hide-scrollbar">
            {[
              { year: 2020, event: 'Founded Organization', impact: '100 survivors supported' },
              { year: 2021, event: 'National Expansion', impact: '500+ volunteers trained' },
              { year: 2022, event: 'Policy Advocacy Win', impact: '3 laws reformed' },
              { year: 2023, event: 'Global Recognition', impact: '10k+ lives impacted' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex-shrink-0 w-80 bg-white p-6 mx-4 rounded-2xl shadow-lg"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="text-purple-600 text-2xl font-bold">{item.year}</div>
                <div className="text-xl text-pink-600 mt-2">{item.event}</div>
                <div className="mt-4 text-gray-600">{item.impact}</div>
                <div className="mt-4 h-2 bg-purple-100 rounded-full">
                  <div 
                    className="h-full bg-pink-500 rounded-full" 
                    style={{ width: `${(index + 1) * 25}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Volunteer Roles Carousel */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-700 text-center mb-12">Critical Volunteer Roles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Crisis Responder',
                requirements: ['40hr training', 'Empathy certification', 'Night shifts'],
                impact: 'Direct survivor support',
              },
              {
                title: 'Community Educator',
                requirements: ['Public speaking', 'Curriculum training', 'Flexible hours'],
                impact: 'Prevention workshops',
              },
              {
                title: 'Legal Advocate',
                requirements: ['Legal background', 'Case management', 'Confidentiality'],
                impact: 'Justice system navigation',
              },
            ].map((role, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-purple-700 text-2xl font-bold">{role.title}</div>
                <div className="mt-4 space-y-4">
                  <div className="text-pink-600 font-medium">Requirements:</div>
                  <ul className="list-disc list-inside space-y-2">
                    {role.requirements.map((req, i) => (
                      <li key={i} className="text-gray-600">{req}</li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                    <span className="font-semibold">Annual Impact:</span> {role.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-900 text-center mb-12">Your Questions Answered</h2>
          <div className="space-y-4">
            {[
              {
                question: 'What training will I receive?',
                answer: 'Our comprehensive 40-hour certification program covers trauma-informed care, crisis intervention, and community resources...'
              },
              {
                question: 'How are volunteers supported?',
                answer: '24/7 supervisor access, monthly wellness checks, and peer support groups ensure your wellbeing...'
              },
              {
                question: 'Can I volunteer remotely?',
                answer: 'Select roles offer hybrid options including hotline support and digital advocacy work...'
              },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex justify-between items-center bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  <span className="text-xl font-semibold text-purple-900">{item.question}</span>
                  <motion.span
                    animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                    className="text-2xl"
                  >
                    ▼
                  </motion.span>
                </button>
                {activeAccordion === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-6 bg-white"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Application Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl shadow-xl"
          >
            <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">Join Our Force</h2>
            
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center p-8 bg-green-50 rounded-xl"
              >
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Application Received!</h3>
                <p className="text-gray-600">We&apos;ll contact you within 3 business days</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                  {errors.name && <span className="text-pink-600">This field is required</span>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Phone</label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Why Join Us? *</label>
                  <textarea
                    {...register("message", { required: true })}
                    rows={4}
                    className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="Share your motivation and relevant experience..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Submitting...' : 'Become an Advocate'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Animated Testimonials */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-pink-700 text-center mb-12">Voices of Change</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah, Crisis Responder",
                text: "Volunteering transformed my understanding of community support...",
                image: "/images/testimonial1.jpg"
              },
              {
                name: "James, Policy Advocate",
                text: "Seeing direct policy changes from our work is incredibly rewarding...",
                image: "/images/testimonial2.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative h-96 rounded-3xl overflow-hidden group"
                whileHover="hover"
                initial="rest"
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/50 to-transparent p-6 flex flex-col justify-end"
                  variants={{
                    rest: { opacity: 0.8 },
                    hover: { opacity: 1 }
                  }}
                >
                  <motion.p
                    className="text-white text-xl font-semibold mb-2"
                    variants={{
                      rest: { y: 30 },
                      hover: { y: 0 }
                    }}
                  >
                    {testimonial.text}
                  </motion.p>
                  <motion.span
                    className="text-pink-300 font-medium"
                    variants={{
                      rest: { opacity: 0 },
                      hover: { opacity: 1 }
                    }}
                  >
                    {testimonial.name}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
