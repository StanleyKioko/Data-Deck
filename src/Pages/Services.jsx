import React from 'react';
import { Link } from 'react-router-dom';
import freightServices from '../assets/Freight Services.jpg';
import warehousing from '../assets/Warehousing.jpg';
import fleetManagement from '../assets/Fleet Management.jpg';
import courierServices from '../assets/Courier Services.jpg';
import  FreightServices from '../assets/Freight Services.jpg';
import fleet from '../assets/fleet.jpg'
import ecommerce from '../assets/e-commerce.mp4';
import eComm from '../assets/e-comm.jpg';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Local Courier Delivery",
      description: "Fast, reliable same-day and next-day delivery for documents and packages within city limits.",
      features: [
        "Same-day delivery within 10 miles",
        "Scheduled pickup windows",
        "Real-time tracking",
        "Proof of delivery",
        "Insurance options available"
      ],
      img: <img src={courierServices} alt="Courier Services" />
    },
    {
      id: 2,
      title: "International Freight",
      description: "Comprehensive international shipping solutions by air, sea, and land for businesses of all sizes.",
      features: [
        "Air, ocean, and ground freight options",
        "Customs clearance assistance",
        "Dangerous goods handling",
        "Temperature-controlled shipping",
        "Consolidated freight services"
      ],
      img: <img 
  src={fleet} 
  alt="fleet" className='hover:scale-105 transition-transform duration-300 rounded-lg'
/>
    
    },
    {
      id: 3,
      title: "Warehousing",
      description: "Secure storage facilities with advanced inventory management systems to streamline your operations.",
      features: [
        "Climate-controlled storage",
        "24/7 security monitoring",
        "Barcode scanning system",
        "Online inventory management",
        "Cross-docking services"
      ],
      img: <img src={warehousing} alt="Warehousing" />
    },
    {
      id: 4,
      title: "Last-Mile Delivery",
      description: "Efficient delivery solutions for the final step in the shipping process, from distribution centers to customers.",
      features: [
        "Scheduled delivery windows",
        "Contactless delivery options",
        "Photo confirmation",
        "Special handling for fragile items",
        "Residential and business deliveries"
      ],
      img: <img src={fleetManagement} alt="Last-Mile Delivery" />
    },
   {
  id: 5,
  title: "E-commerce Logistics",
  description: "Integrated logistics solutions designed specifically for online retailers to optimize the fulfillment process.",
  features: [
    "Order fulfillment integration",
    "Multi-channel inventory sync",
    "Returns management",
    "Branded packaging options",
    "Analytics and reporting"
  ],
  img: <img src={eComm} alt="E-commerce Logistics" />
}
  ];

  const pricingTiers = [
    {
      name: "Basic",
      price: "$199",
      period: "per month",
      features: [
        "Local courier delivery",
        "Basic tracking",
        "Email support",
        "Up to 50 packages monthly",
        "Basic reporting"
      ],
      cta: "Get Started"
    },
    {
      name: "Business",
      price: "$499",
      period: "per month",
      featured: true,
      features: [
        "All Basic features",
        "International shipping",
        "Priority support",
        "Up to 200 packages monthly",
        "Warehousing (500 sq ft)",
        "Advanced analytics"
      ],
      cta: "Choose Business"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored solution",
      features: [
        "All Business features",
        "Dedicated account manager",
        "Unlimited packages",
        "Custom warehousing",
        "API access",
        "White-label options",
        "24/7 support"
      ],
      cta: "Contact Us"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Logistics Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive shipping, warehousing, and supply chain solutions tailored to meet your business needs
          </p>
        </div>
      </div>

      {/* Services Showcase */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`flex flex-col ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                } gap-8 items-center`}
              >
                <div className="md:w-1/2">
                  <div className="bg-blue-100 h-64 rounded-lg flex items-center justify-center">
                    {service.img || service.video} 
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4 text-blue-900">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100">
                    <h3 className="font-bold mb-4 text-blue-700">Key Features</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-6">Pricing Plans</h2>
        <div className="container mx-auto px-4">
          <p className="text-center text-lg text-gray-600 mb-12">
            Choose the plan that best fits your business needs
          </p>
          <div className="grid md:grid-cols-3 gap-8 lg-gap-12">
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-all hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-2 text-center">Basic Plan</h3>
              <p className="text-gray-600 mb-6 text-center">Ideal for startups and small businesses</p>
              <p className="text-4xl font-bold mb-6 text-center">$199 <span className="text-lg text-gray-600 font-normal">/ month</span></p>
              <ul className="mb-6 flex-grow space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Local courier delivery</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic tracking</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Email support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Up to 50 packages monthly</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic reporting</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic analytics dashboard</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Real-time data visualization</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Customizable reports</span>
                </li>
              </ul>
              <button className="w-full bg-[#00df9a] text-black py-2 rounded-md font-bold hover:bg-opacity-80 transition-all">Get Started
              </button>
            </div>
            <div className='bg-[#fffc5c] p-8 rounded-lg shadow-xl border-2 border-[#00df92] hover:shadow-2xl transition-all transform md:-translate-y-4 hover:scale-105 transition-transform duration-300'>
              <div className="bg-[#00df92] text-black text-sm font-bold py-1 p-4 rounded-full inline-block mb-2 justify-center">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Professional Plan</h3>
              <p className="text-gray-600 mb-6 text-center">Perfect for growing businesses</p>
              <div className="text-4xl font-bold mb-6 text-center">$399 <span className="text-lg text-gray-600 font-normal">/ month</span></div>
              <ul className="mb-6 flex-grow space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All Basic Plan features</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Up to 200 packages monthly</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Advanced reporting</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Customizable alerts</span>
                </li>
              </ul>
              <button className="w-full bg-[#00df2a] text-black py-2 rounded font-bold hover:bg-opacity-80 transition-all">Get Started</button>
            </div>
            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-[#00df92] hover:shadow-2xl transition-all transform md:-translate-y-4 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-2 text-center">Enterprise Plan</h3>
              <p className="text-gray-600 mb-6 text-center">Best for large organizations</p>
              <div className="text-4xl font-bold mb-6 text-center">$799 <span className="text-lg text-gray-600 font-normal">/ month</span></div>
              <ul className="mb-6 flex-grow space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All Professional Plan features</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom solutions</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>On-site support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Unlimited packages</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Comprehensive reporting</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dedicated infrastructure</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>24/7 support</span>
                </li>
              </ul>
              <button className="w-full bg-[#00df9a] text-black py-2 rounded font-bold hover:bg-opacity-80 transition-all">Get Started</button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Logistics?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our experts analyze your shipping needs and design a custom solution that saves you time and money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-blue-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              Get a Free Consultation
            </Link>
            <Link to="/track" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-800 transition duration-300">
              Track a Package
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;