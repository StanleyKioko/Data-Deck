import React from 'react';
import { Link } from 'react-router-dom';

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
      icon: "🚚"
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
      icon: "✈️"
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
      icon: "🏭"
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
      icon: "🏠"
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
      icon: "🛒"
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
                    <span className="text-7xl">{service.icon}</span>
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
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`
                  rounded-lg overflow-hidden
                  ${tier.featured 
                    ? 'bg-white border-2 border-blue-500 shadow-xl transform -translate-y-4' 
                    : 'bg-white border border-gray-200 shadow-lg'
                  }
                `}
              >
                {tier.featured && (
                  <div className="bg-blue-500 text-white py-2 px-4 text-center">
                    <p className="text-sm font-bold">MOST POPULAR</p>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-gray-500 ml-2">{tier.period}</span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`
                      w-full py-3 px-6 rounded-lg font-bold transition duration-300
                      ${tier.featured 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }
                    `}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 text-gray-600">
            <p>Need a custom solution? <Link to="/contact" className="text-blue-600 font-semibold">Contact our sales team</Link></p>
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