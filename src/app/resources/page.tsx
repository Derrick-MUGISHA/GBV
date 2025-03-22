"use client"
import React, { useEffect, useState } from 'react';
import { FiHeart, FiShield, FiBook, FiPhoneForwarded, FiGlobe } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import Footer from '../Footer/page';
import Navigation from '../navigation/page';

const Resources = () => {
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  
  // Animation for the background
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition(prev => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const resourceCategories = [
    {
      title: "Emergency Contacts",
      icon: <FiPhoneForwarded className="w-8 h-8 text-pink-600" />,
      items: [
        {
          title: "24/7 National Hotline",
          description: "Immediate crisis intervention and support",
          contact: "0800 555 555"
        },
        {
          title: "SMS Help Line",
          description: "Text support for discreet assistance",
          contact: "SMS 'HELP' to 3434"
        }
      ]
    },
    {
      title: "Legal Assistance",
      icon: <FiShield className="w-8 h-8 text-purple-600" />,
      items: [
        {
          title: "Legal Aid Services",
          description: "Free legal representation and advice",
          contact: "0800 555 556"
        },
        {
          title: "Protection Orders",
          description: "Help obtaining court protection",
          contact: "contact@legalprotect.org"
        }
      ]
    },
    {
      title: "Support Services",
      icon: <FiHeart className="w-8 h-8 text-pink-600" />,
      items: [
        {
          title: "Counseling Centers",
          description: "Trauma-informed therapy sessions",
          contact: "Find nearby centers"
        },
        {
          title: "Support Groups",
          description: "Peer-led community meetings",
          contact: "groups@safespace.org"
        }
      ]
    }
  ];

  // SVG animation for the changing world
  const WorldAnimation = () => (
    <svg 
      className="absolute inset-0 w-full h-full opacity-20" 
      viewBox="0 0 1000 300" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Animated Globe */}
      <circle 
        cx="500" 
        cy="150" 
        r="100" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        strokeDasharray="5,5" 
        style={{ 
          transformOrigin: "center",
          animation: "spin 20s linear infinite"
        }}
      />
      
      {/* Latitude lines */}
      {[30, 60, 90, 120, 150].map((pos, i) => (
        <ellipse 
          key={i} 
          cx="500" 
          cy="150" 
          rx="100" 
          ry={pos / 3} 
          fill="none" 
          stroke="white" 
          strokeWidth="1" 
          strokeOpacity="0.5"
        />
      ))}
      
      {/* Random dots representing locations */}
      {Array.from({ length: 20 }).map((_, i) => (
        <circle 
          key={i}
          cx={400 + Math.sin(i * 0.5 + backgroundPosition / 10) * 100}
          cy={150 + Math.cos(i * 0.5 + backgroundPosition / 10) * 50}
          r="3"
          fill="white"
        />
      ))}
      
      {/* Animated connections */}
      {Array.from({ length: 10 }).map((_, i) => (
        <path 
          key={i}
          d={`M${500 + Math.sin(i * 0.7) * 80},${150 + Math.cos(i * 0.7) * 40} 
              Q${500 + Math.sin(i * 0.7 + backgroundPosition / 20) * 40},
              ${150 - 20 + Math.sin(backgroundPosition / 15) * 20} 
              ${500 + Math.cos(i * 0.7) * 80},${150 + Math.sin(i * 0.7) * 40}`}
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.6"
          strokeDasharray="3,3"
        />
      ))}
    </svg>
  );

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Hero Section with Animation */}
      <div className="relative h-96 bg-purple-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-700"
          style={{ 
            backgroundSize: "200% 200%",
            backgroundPosition: `${backgroundPosition}% 50%`,
            transition: "background-position 0.5s ease"
          }}
        />
        
        {/* World Animation */}
        <WorldAnimation />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center px-4">
            Resources & Support Services
          </h1>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-70"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translateY(${(backgroundPosition / 2) % 100}px)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Immediate Help Resources
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find critical support services, emergency contacts, and community 
            resources tailored to your needs. All services are confidential.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourceCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-full">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-900">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-4 border-pink-200 pl-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-pink-600 font-medium">
                      <FiGlobe className="w-4 h-4" />
                      <span>{item.contact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Additional Support Channels
            </h2>
            <p className="text-gray-600">
              Explore more ways to get help and support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 hover:bg-purple-50 rounded-xl">
              <FiBook className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Educational Materials</h3>
              <p className="text-gray-600 mb-4">
                Download our safety planning guides and legal rights handbooks
              </p>
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Download Resources
              </Button>
            </div>

            <div className="text-center p-6 hover:bg-purple-50 rounded-xl">
              <FiHeart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Forum</h3>
              <p className="text-gray-600 mb-4">
                Connect with survivors in our moderated support community
              </p>
              <Button className="bg-pink-600 text-white hover:bg-pink-700">
                Join Community
              </Button>
            </div>

            <div className="text-center p-6 hover:bg-purple-50 rounded-xl">
              <FiShield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safety Planning</h3>
              <p className="text-gray-600 mb-4">
                Create a personalized safety plan with our expert guides
              </p>
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Start Planning
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Footer */}
      <div className="bg-purple-900 text-white py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg mb-4">
            <strong>Remember:</strong> Your browser history can be monitored. 
            Use the &apos;Quick Exit&apos; button if you need to leave immediately.
          </p>
          <Button className="bg-pink-600 text-white hover:bg-pink-700">
            Quick Exit
          </Button>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-100px) translateX(20px); }
          100% { transform: translateY(-200px) translateX(0); opacity: 0; }
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
};

export default Resources;