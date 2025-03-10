"use client"
import React, { useState, useEffect } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import Footer from '../Footer/page';
import Navigation from '../navigation/page';

const Contact = () => {
  // State for the changing header text
  const [headerText, setHeaderText] = useState("You're Not Alone. We're Here to Help.");
  const courtPhrases = [
    "You're Not Alone. We're Here to Help.",
    "Justice Accessible to Everyone.",
    "Your Rights Matter. We Stand With You.",
    "Equal Justice Under Law.",
    "Seek Justice. Protect Your Rights."
  ];

  // Animation for changing header text
  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderText(prevText => {
        const currentIndex = courtPhrases.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % courtPhrases.length;
        return courtPhrases[nextIndex];
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  },);

  // Animation for contact items and form fields
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
                  <p className="text-gray-600">legal@justiceforall.org</p>
                  <p className="text-gray-600">24/7 Emergency Assistance</p>
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
                  <p className="text-gray-600">24/7 Assistance: 0800 555 5555</p>
                  <p className="text-gray-600">Legal Advice: 0800 555 5556</p>
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
                  <p className="text-gray-600">123 Justice Avenue</p>
                  <p className="text-gray-600">Courthouse District, JD 12345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with Court Theme */}
          <div
            className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
            style={{animation: 'slideIn 0.8s ease-out forwards', opacity: 0, transform: 'translateX(50px)'}}
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-purple-900">Request Legal Consultation</h3>
              <div className="h-px w-24 bg-purple-300 mx-auto mt-2"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 form-field opacity-0" style={{transition: 'all 0.5s ease', transitionDelay: '0.1s', transform: 'translateY(20px)'}}>
                <label className="text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Your full legal name"
                />
              </div>

              <div className="space-y-2 form-field opacity-0" style={{transition: 'all 0.5s ease', transitionDelay: '0.2s', transform: 'translateY(20px)'}}>
                <label className="text-gray-700 font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2 form-field opacity-0" style={{transition: 'all 0.5s ease', transitionDelay: '0.3s', transform: 'translateY(20px)'}}>
                <label className="text-gray-700 font-medium">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="For confidential contact"
                />
              </div>

              <div className="space-y-2 form-field opacity-0" style={{transition: 'all 0.5s ease', transitionDelay: '0.4s', transform: 'translateY(20px)'}}>
                <label
                  htmlFor="inquiryType"
                  className="text-gray-700 font-medium"
                >
                  Matter Type
                </label>
                <select
                  id="inquiryType"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  aria-label="Select matter type"
                >
                  <option>Select matter type</option>
                  <option>Family Law</option>
                  <option>Criminal Defense</option>
                  <option>Civil Rights</option>
                  <option>Housing & Tenancy</option>
                  <option>Employment Law</option>
                  <option>Other Legal Matter</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 form-field opacity-0" style={{transition: 'all 0.5s ease', transitionDelay: '0.5s', transform: 'translateY(20px)'}}>
              <label className="text-gray-700 font-medium">Brief Description of Your Situation</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Please provide a brief overview of your legal concerns..."
              />
            </div>

            <div className="text-center form-field opacity-0" style={{transition: 'all 0.5s ease', transitionDelay: '0.6s', transform: 'translateY(20px)'}}>
              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Submit Request</span>
                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity"></span>
              </button>
            </div>
          </div>
        </div>
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