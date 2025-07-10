import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";
import logo1 from '../assets/logo1.jpg';
import logo2 from '../assets/logo2.jpg';
import logo3 from '../assets/logo3.jpg';
import logo4 from '../assets/logo4.jpg';
import logo5 from '../assets/logo5.jpg';
import logo6 from '../assets/logo6.jpg';
import AiChatBot from '../components/AiChatBot';
import header from '../assets/header.jpg';


const Home = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isSliding, setIsSliding] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const cardSliderRef = useRef(null);
  
  // Company logos and information
  const partnerCompanies = [
    {
      id: 1,
      name: "TechGlobal",
      logo: logo1,
      description: "Leading technology solutions provider with global reach and innovative services."
    },
    {
      id: 2,
      name: "EcoShip",
      logo: logo2,
      description: "Sustainable shipping company focused on reducing carbon footprint in logistics."
    },
    {
      id: 3,
      name: "FastTrack",
      logo: logo3,
      description: "Specialized in rapid deliveries and time-sensitive logistics solutions."
    },
    {
      id: 4,
      name: "MegaRetail",
      logo: logo4,
      description: "One of the largest retail chains with complex supply chain requirements."
    },
    {
      id: 5,
      name: "GoldTrans",
      logo: logo5,
      description: "Premium logistics provider for high-value and sensitive merchandise."
    },
    {
      id: 6,
      name: "InfiniteCo",
      logo: logo6,
      description: "Diversified business conglomerate with worldwide operations and logistics needs."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      company: "Tech Solutions Inc.",
      quote: "Blobe Logistics has transformed our supply chain with their efficient delivery services. Highly recommended!",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Retail Enterprises",
      quote: "Their warehousing solutions helped us scale our operations during peak seasons. Excellent service!",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "Global Imports",
      quote: "The international freight service is impeccable. Timely deliveries and careful handling of our products.",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  const handleTracking = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      window.location.href = `/track?id=${trackingId}`;
    }
  };

  // Function to scroll to the next set of cards
  const scrollToNextCards = () => {
    if (cardSliderRef.current) {
      const cardWidth = cardSliderRef.current.offsetWidth;
      cardSliderRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
      
      // Update current card index (for visual indicator)
      const maxIndex = Math.ceil(partnerCompanies.length / 3) - 1; // Assuming 3 cards are visible at once
      setCurrentCardIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
    }
  };

  // Function to scroll to the previous set of cards
  const scrollToPrevCards = () => {
    if (cardSliderRef.current) {
      const cardWidth = cardSliderRef.current.offsetWidth;
      cardSliderRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
      
      // Update current card index (for visual indicator)
      setCurrentCardIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setShowChatbot(prev => !prev);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Blobe Logistics Solutions for Your Business</h1>
            <ReactTyped strings={["Reliable, efficient, and secure delivery services worldwide"]} 
            typeSpeed={120} 
            backSpeed={140}
            loop />
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link to="/services" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-300 transform hover:scale-105">
                Get a Quote
              </Link>
              <Link to="/track" className="bg-white text-blue-800 font-bold py-3 px-6 rounded-lg text-center transition duration-300 transform hover:scale-105 hover:bg-gray-100">
                Track Your Parcel
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src={header} alt="Logistics Services" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      {/* Tracking Bar */}
      <div className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <form onSubmit={handleTracking} className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="text-lg font-semibold text-gray-700">Track Your Shipment:</div>
            <input
              type="text"
              placeholder="Enter your tracking number"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="border rounded-lg py-3 px-4 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 hover:scale-105 transform transition-duration-300"
            >
              Track Now
            </button>
          </form>
        </div>
      </div>

      {/* Services Section */}

      {/* Client Logos - Updated with horizontal scrolling cards */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Trusted By Industry Leaders</h2>
          
          {/* Card Slider Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={scrollToPrevCards}
              disabled={currentCardIndex === 0}
              className={`p-2 rounded-full ${currentCardIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Dots indicator for current page */}
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(partnerCompanies.length / 3) }).map((_, index) => (
                <span 
                  key={index} 
                  className={`h-2 w-2 rounded-full ${currentCardIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                ></span>
              ))}
            </div>
            
            <button 
              onClick={scrollToNextCards}
              disabled={currentCardIndex >= Math.ceil(partnerCompanies.length / 3) - 1}
              className={`p-2 rounded-full ${currentCardIndex >= Math.ceil(partnerCompanies.length / 3) - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Card Slider Container */}
          <div className="relative overflow-hidden">
            <div 
              ref={cardSliderRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
            >
              {partnerCompanies.map((company) => (
                <div 
                  key={company.id} 
                  className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-12px)] snap-start"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="h-48 overflow-hidden flex items-center justify-center p-4 bg-gray-50">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="max-h-40 max-w-full object-contain transition-all duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{company.name}</h3>
                      <p className="text-gray-600">{company.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add custom styling to hide scrollbar */}
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-gray-600 text-sm">{item.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{item.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your Logistics?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of businesses that trust Blobe Logistics for their shipping and warehousing needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-blue-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              Contact Us
            </Link>
            <Link to="/services" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-800 transition duration-300">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
      
      {/* AI Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleChatbot}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          {showChatbot ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="ml-2 hidden md:inline">AI Assistant</span>
            </>
          )}
        </button>
      </div>
      
      {/* AI Chatbot Component */}
      <AiChatBot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </div>
  );
};

export default Home;