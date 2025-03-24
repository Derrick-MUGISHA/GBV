"use client"
import React, { useMemo, useState, useEffect } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import Footer from '../Footer/page';
import Navigation from '../navigation/page';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database, ref, push, serverTimestamp, set } from "@/app/firebase/config";

const Contact = () => {
  const [user] = useAuthState(auth);
  const [headerText, setHeaderText] = useState("You're Not Alone. We're Here to Help.");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    matterType: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const courtPhrases = useMemo(() => [
    "You're Not Alone. We're Here to Help.",
    "Justice Accessible to Everyone.",
    "Your Rights Matter. We Stand With You.",
    "Equal Justice Under Law.",
    "Seek Justice. Protect Your Rights."
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderText(prevText => {
        const currentIndex = courtPhrases.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % courtPhrases.length;
        return courtPhrases[nextIndex];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [courtPhrases]);

  useEffect(() => {
    // Simple animation for staggered entry of contact info items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-in');
      }, 300 * (index + 1));
    });

    // Form fields animation on scroll
    const formFields = document.querySelectorAll('.form-field');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    formFields.forEach(field => {
      observer.observe(field);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      // Save report to database
      const reportsRef = ref(database, 'reports');
      const newReportRef = push(reportsRef);
      
      await set(newReportRef, {
        ...formData,
        userId: user?.uid || 'anonymous',
        status: 'submitted',
        createdAt: serverTimestamp()
      });

      // Create notification for logged-in users
      if (user) {
        const notificationsRef = ref(database, `users/${user.uid}/notifications`);
        const newNotificationRef = push(notificationsRef);
        
        await set(newNotificationRef, {
          type: 'report_submission',
          message: 'Your report has been successfully submitted',
          read: false,
          createdAt: serverTimestamp()
        });
      }

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
      setFormData({
        name: '',
        email: '',
        phone: '',
        matterType: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting report:', error);
      setError('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      {/* Hero Section with Court Theme */}
      <div 
        className="relative h-96 bg-purple-900 flex items-center justify-center overflow-hidden"
      >
        {/* Court-like pillars on sides */}
        <div className="absolute left-0 top-0 h-full w-6 md:w-16 bg-purple-800 shadow-lg" 
             style={{animation: 'slideInLeft 1s ease-out forwards'}}></div>
        <div className="absolute right-0 top-0 h-full w-6 md:w-16 bg-purple-800 shadow-lg"
             style={{animation: 'slideInRight 1s ease-out forwards'}}></div>
             
        {/* Gavel icon */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
            <path d="M13 7L9 3L5 7L9 11L13 7Z M9 7L9 7 M16 16L20 20L18 22L14 18L16 16Z M16 16L13.5 13.5 M13.5 13.5L11 11 M11 11L9 9" 
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-opacity-70 bg-gradient-to-r from-purple-900 to-pink-700 animate-gradient" />
        
        {/* Court-like header text */}
        <div className="z-10 text-center px-4 w-full max-w-4xl">
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-4 header-text"
            style={{animation: 'fadeInOut 5s infinite'}}
          >
            {headerText}
          </h1>
          <div className="h-px w-full md:w-2/3 mx-auto bg-white opacity-50 mb-4"></div>
          <p className="text-white text-opacity-90 text-lg animate-fadeUp">Confidential Legal Support & Guidance</p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information with Court Theme */}
          <div className="space-y-8">
            <h2 
              className="text-4xl font-bold text-purple-900 mb-6 relative"
              style={{animation: 'fadeIn 1s ease-out forwards'}}
            >
              Access to Justice
              <div className="h-1 w-20 bg-purple-600 mt-2"></div>
            </h2>

            <div className="space-y-6">
              <div 
                className="flex items-start space-x-4 contact-item opacity-0"
                style={{transform: 'translateY(20px)', transition: 'all 0.5s ease'}}
              >
                <div className="p-3 bg-purple-100 rounded-full">
                  <HiOutlineMail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Email Correspondence
                  </h3>
                  <p className="text-gray-600">info@rwandabar.org.rw</p>
                  <p className="text-gray-600">24/7 Emergency Assistance: 122</p>
                </div>
              </div>

              <div 
                className="flex items-start space-x-4 contact-item opacity-0"
                style={{transform: 'translateY(20px)', transition: 'all 0.5s ease'}}
              >
                <div className="p-3 bg-purple-100 rounded-full">
                  <HiOutlinePhone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Legal Hotline
                  </h3>
                  <p className="text-gray-600">Ambulance: 912, Gender-Based Violence (GBV) & Child Protection Hotline: 3512 </p>
                  <p className="text-gray-600">Isange One Stop Center (GBV & Domestic Violence Support - 24/7): 3512</p>
                </div>
              </div>

              <div 
                className="flex items-start space-x-4 contact-item opacity-0"
                style={{transform: 'translateY(20px)', transition: 'all 0.5s ease'}}
              >
                <div className="p-3 bg-purple-100 rounded-full">
                  <HiOutlineLocationMarker className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Office Location
                  </h3>
                  <p className="text-gray-600">📍 Kacyiru District Hospital, Kigali</p>
                  <p className="text-gray-600">📞 3512 (Toll-Free, Available 24/7)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with Court Theme */}
          <div
            className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
            style={{animation: 'slideIn 0.8s ease-out forwards', opacity: 0, transform: 'translateX(50px)'}}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-purple-900">Request Legal Consultation</h3>
                <div className="h-px w-24 bg-purple-300 mx-auto mt-2"></div>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Form fields with state binding */}
                <div className="space-y-2 form-field">
                  <label htmlFor="full-name" className="text-gray-700 font-medium">Full Name *</label>
                  <input
                    id="full-name"
                    name="full-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2 form-field">
                  <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2 form-field">
                  <label htmlFor="phone" className="text-gray-700 font-medium">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2 form-field">
                  <label htmlFor="matter-type" className="text-gray-700 font-medium">Matter Type</label>
                  <select
                    id="matter-type"
                    name="matter-type"
                    value={formData.matterType}
                    onChange={(e) => setFormData({...formData, matterType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    aria-label="Select a matter type"
                    title="Legal matter type"
                  >
                    <option value="">Select matter type</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Criminal Defense">Criminal Defense</option>
                    <option value="Civil Rights">Civil Rights</option>
                    <option value="Housing & Tenancy">Housing & Tenancy</option>
                    <option value="Employment Law">Employment Law</option>
                    <option value="Other Legal Matter">Other Legal Matter</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 form-field">
                <label htmlFor="description" className="text-gray-700 font-medium">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Please describe your legal matter"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 disabled:bg-gray-400"
              >
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          </div>
        </div>

        {submitSuccess && (
          <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-4 rounded-lg shadow-xl transform transition-all duration-500 ease-in-out animate-slide-up z-50">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div><div className="flex-1">
                <p className="font-semibold">Report Submitted Successfully!</p>
                <p className="text-sm text-white text-opacity-90">Check your notifications for updates</p>
              </div>
              <button 
                onClick={() => setSubmitSuccess(false)} 
                className="flex-shrink-0 text-white hover:text-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 rounded-full w-full">
              <div className="h-full bg-white rounded-full animate-shrink"></div>
            </div>
          </div>
        )}
      </div>

      {/* Safety Note with Court Theme */}
      <div className="bg-purple-900 text-white py-8 text-center">
        <div 
          className="max-w-4xl mx-auto px-4"
          style={{animation: 'fadeIn 1s ease-out 0.5s forwards', opacity: 0}}
        >
          <p className="text-lg relative inline-block">
            <span className="absolute -left-3 top-1/2 h-2 w-2 bg-pink-400 rounded-full animate-ping"></span>
            <strong>Confidentiality Guaranteed:</strong> All communications are
            protected by attorney-client privilege. We employ end-to-end encryption 
            for your privacy and security.
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(50px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from { 
            transform: translateX(-100%);
          }
          to { 
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from { 
            transform: translateX(100%);
          }
          to { 
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        @keyframes slide-up {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        
        .animate-fadeUp {
          animation: fadeUp 1s ease-out forwards;
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }

        .animate-shrink {
          animation: shrink 5s linear forwards;
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .header-text {
          animation-name: fadeInOut;
          animation-duration: 5s;
          animation-timing-function: ease;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
};

// Export Contact as the page component
export default function ContactPage() {
  return <Contact />;
}
