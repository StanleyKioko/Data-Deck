import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";

const Home = () => {
  const [trackingId, setTrackingId] = useState('');

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

  const services = [
    {
      id: 1,
      title: "Freight Services",
      description: "Domestic and international freight solutions for businesses of all sizes",
      icon: "🚚"
    },
    {
      id: 2,
      title: "Courier Services",
      description: "Fast and reliable delivery for documents and small parcels",
      icon: "📦"
    },
    {
      id: 3,
      title: "Warehousing",
      description: "Secure storage solutions with inventory management",
      icon: "🏭"
    },
    {
      id: 4,
      title: "Fleet Management",
      description: "Optimized fleet operations for maximum efficiency",
      icon: "🚛"
    }
  ];

  const handleTracking = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      window.location.href = `/track?id=${trackingId}`;
    }
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-300 transform hover:scale-105">
                Get a Quote
              </Link>
              <Link to="/track" className="bg-white text-blue-800 font-bold py-3 px-6 rounded-lg text-center transition duration-300 transform hover:scale-105 hover:bg-gray-100">
                Track Your Parcel
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Logistics Services" 
              className="rounded-lg shadow-xl"
            />
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
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300"
            >
              Track Now
            </button>
          </form>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <Link to="/services" className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Logos */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Trusted By Industry Leaders</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="grayscale hover:grayscale-0 transition duration-300">
                <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 font-bold">LOGO {i + 1}</span>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default Home;