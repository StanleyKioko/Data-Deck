import React from 'react';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jennifer Parker",
      role: "CEO & Founder",
      bio: "With over 20 years in logistics and supply chain management, Jennifer has transformed Blobe Logistics into an industry leader.",
      image: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      id: 2,
      name: "Robert Chen",
      role: "Head of Operations",
      bio: "Robert oversees global operations and ensures smooth coordination between our international offices.",
      image: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Fleet Manager",
      bio: "Maria's expertise in fleet optimization has reduced our delivery times by 25% while maintaining top safety standards.",
      image: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Technology Director",
      bio: "David leads our digital transformation, implementing cutting-edge tracking and inventory management systems.",
      image: "https://randomuser.me/api/portraits/men/7.jpg"
    }
  ];

  const milestones = [
    {
      year: 2010,
      title: "Foundation",
      description: "Blobe Logistics was founded with a small fleet of 5 vehicles."
    },
    {
      year: 2013,
      title: "Regional Expansion",
      description: "Opened our first regional offices and expanded to neighboring states."
    },
    {
      year: 2015,
      title: "International Services",
      description: "Launched our international freight services with partners in Europe and Asia."
    },
    {
      year: 2018,
      title: "Digital Transformation",
      description: "Implemented real-time tracking system and modern warehouse management solutions."
    },
    {
      year: 2020,
      title: "Sustainability Initiative",
      description: "Began transition to electric vehicles and carbon-neutral operations."
    },
    {
      year: 2023,
      title: "Global Recognition",
      description: "Named 'Logistics Company of the Year' at the International Supply Chain Awards."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Blobe Logistics</h1>
          <p className="text-xl max-w-3xl mx-auto">Connecting businesses worldwide with reliable and innovative logistics solutions since 2010</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Company headquarters" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Blobe Logistics began as a small courier service in 2010 with a vision to revolutionize the logistics industry through reliability, innovation, and customer-focused solutions.
              </p>
              <p className="text-gray-700 mb-4">
                From our humble beginnings with just 5 vehicles, we've grown into a global logistics provider with operations in 15 countries, serving over 10,000 businesses worldwide.
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is to provide seamless logistics solutions that empower businesses to focus on their growth while we handle the complexities of their supply chain.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Our Values</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Reliability in every delivery</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Innovation in logistics solutions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Sustainability in our operations</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Transparency with our clients</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">Our Journey</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex flex-col md:flex-row items-center">
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-blue-900">{milestone.title}</h3>
                      <p className="text-blue-600 font-bold">{milestone.year}</p>
                      <p className="text-gray-600 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-0 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-white"></div>
                  </div>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    {index % 2 === 0 ? (
                      <div className="hidden md:block h-0"></div>
                    ) : (
                      <div className="hidden md:block h-0"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Presence Map */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">Our Global Presence</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-10">
            With offices and partners in strategic locations around the world, we offer comprehensive logistics coverage to meet your needs wherever you do business.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {/* Replace with actual map component in production */}
            <div className="h-96 bg-blue-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-lg">Interactive Map Placeholder</p>
              <p className="text-sm text-gray-400">(Would integrate with Google Maps API in production)</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">North America</h4>
              <p className="text-sm text-gray-600">3 offices</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">Europe</h4>
              <p className="text-sm text-gray-600">5 offices</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">Asia</h4>
              <p className="text-sm text-gray-600">4 offices</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">Africa</h4>
              <p className="text-sm text-gray-600">1 office</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">Australia</h4>
              <p className="text-sm text-gray-600">1 office</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">South America</h4>
              <p className="text-sm text-gray-600">1 office</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;