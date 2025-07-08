import React, { useState } from 'react';

const Careers = () => {
  // State for the application form
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null,
    coverLetter: '',
    howHeard: 'Website'
  });

  // Available job positions
  const jobPositions = [
    {
      id: 1,
      title: 'Logistics Coordinator',
      location: 'New York, NY',
      type: 'Full-time',
      department: 'Operations',
      description: 'Coordinate and oversee logistics operations, ensuring efficient movement of goods from origin to destination.',
      requirements: [
        'Bachelor\'s degree in Logistics, Supply Chain Management, or related field',
        '2+ years of experience in logistics coordination',
        'Proficient in logistics management software',
        'Strong problem-solving and organizational skills'
      ]
    },
    {
      id: 2,
      title: 'Delivery Driver',
      location: 'Multiple Locations',
      type: 'Full-time / Part-time',
      department: 'Delivery',
      description: 'Responsible for the safe and timely delivery of packages to customers. Handle loading, transporting, and delivering items.',
      requirements: [
        'Valid driver\'s license with clean record',
        'High school diploma or equivalent',
        'Ability to lift up to 50lbs',
        'Strong customer service skills'
      ]
    },
    {
      id: 3,
      title: 'Customer Service Representative',
      location: 'Remote',
      type: 'Full-time',
      department: 'Customer Support',
      description: 'Provide exceptional customer service by addressing inquiries, resolving issues, and offering information about our logistics services.',
      requirements: [
        'Excellent verbal and written communication skills',
        'Previous experience in customer service',
        'Ability to work in a fast-paced environment',
        'Computer literacy and familiarity with CRM software'
      ]
    },
    {
      id: 4,
      title: 'Warehouse Manager',
      location: 'Chicago, IL',
      type: 'Full-time',
      department: 'Warehousing',
      description: 'Oversee daily operations of the warehouse, including receiving, storing, and shipping of goods. Manage warehouse staff and ensure compliance with safety regulations.',
      requirements: [
        'Bachelor\'s degree in Logistics, Supply Chain, or related field',
        '5+ years of warehouse management experience',
        'Strong leadership and team management abilities',
        'Experience with inventory management systems'
      ]
    },
    {
      id: 5,
      title: 'Fleet Maintenance Technician',
      location: 'Dallas, TX',
      type: 'Full-time',
      department: 'Fleet Management',
      description: 'Responsible for the maintenance and repair of company vehicles. Perform regular inspections and preventive maintenance.',
      requirements: [
        'Technical certification in automotive or diesel mechanics',
        '3+ years of experience in vehicle maintenance',
        'Knowledge of DOT regulations',
        'Valid driver\'s license'
      ]
    },
  ];

  // State for the selected job
  const [selectedJob, setSelectedJob] = useState(null);

  // Company culture/benefits
  const companyPerks = [
    {
      icon: '🏥',
      title: 'Health Benefits',
      description: 'Comprehensive health, dental, and vision insurance for all full-time employees'
    },
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages with regular performance reviews'
    },
    {
      icon: '🌴',
      title: 'Generous PTO',
      description: 'Flexible vacation policy and paid holidays to ensure work-life balance'
    },
    {
      icon: '📚',
      title: 'Professional Development',
      description: 'Continuous learning opportunities and tuition assistance for relevant courses'
    },
    {
      icon: '🚗',
      title: 'Transportation Benefits',
      description: 'Commuter benefits and company vehicle discounts for eligible positions'
    },
    {
      icon: '🏆',
      title: 'Recognition Program',
      description: 'Regular employee recognition and performance-based bonuses'
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setApplicationForm(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Application submitted:', applicationForm);
    alert('Thank you for your application! We will contact you soon.');
    
    // Reset the form
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      position: selectedJob ? selectedJob.title : '',
      resume: null,
      coverLetter: '',
      howHeard: 'Website'
    });
    
    // Clear the selected job
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Build your career with us and be part of a global logistics network that connects businesses and people around the world.
          </p>
        </div>
      </div>

      {/* Life at the Company Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Life at Blobe Logistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Culture</h3>
              <p className="text-gray-700 mb-6">
                At Blobe Logistics, we foster a culture of innovation, collaboration, and excellence. 
                We believe in empowering our employees to make decisions, take ownership, and grow 
                both personally and professionally.
              </p>
              <p className="text-gray-700">
                Our diverse team brings together different perspectives and experiences, creating 
                a rich environment where everyone's voice is heard and valued. We celebrate successes 
                together and support each other through challenges.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          {/* Benefits/Perks */}
          <h3 className="text-2xl font-semibold text-center mb-8">Benefits & Perks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {companyPerks.map((perk, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl mb-3">{perk.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{perk.title}</h4>
                <p className="text-gray-700">{perk.description}</p>
              </div>
            ))}
          </div>
          
          {/* Employee Testimonials */}
          <h3 className="text-2xl font-semibold text-center mb-8">Employee Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic mb-4">
                "Working at Blobe Logistics has been an incredible journey. The company truly invests in its 
                employees and provides opportunities to grow. I started as a logistics coordinator and 
                now lead a team of professionals."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center font-semibold text-blue-700 mr-3">
                  JD
                </div>
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-sm text-gray-600">Operations Manager, 5 years</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic mb-4">
                "The company culture here is unlike any place I've worked before. There's a real sense of 
                teamwork and mutual respect. The leadership is transparent and always open to new ideas."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center font-semibold text-blue-700 mr-3">
                  MS
                </div>
                <div>
                  <p className="font-semibold">Michael Smith</p>
                  <p className="text-sm text-gray-600">Fleet Supervisor, 3 years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobPositions.map((job) => (
              <div 
                key={job.id} 
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{job.location} • {job.department}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
                <button 
                  className="text-blue-700 font-semibold hover:text-blue-900"
                  onClick={() => setSelectedJob(job)}
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Application Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Apply Today</h2>
          
          {selectedJob ? (
            <div className="max-w-4xl mx-auto mb-12 bg-gray-50 p-6 rounded-lg shadow">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-blue-700">{selectedJob.title}</h3>
                  <button 
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times; Close
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{selectedJob.location} • {selectedJob.department} • {selectedJob.type}</p>
                <h4 className="text-lg font-semibold mb-2">Job Description</h4>
                <p className="text-gray-700 mb-4">{selectedJob.description}</p>
                <h4 className="text-lg font-semibold mb-2">Requirements</h4>
                <ul className="list-disc pl-5 mb-4">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700 mb-1">{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          
          {/* Application Form */}
          <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-6">Application Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name *
                </label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={applicationForm.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={applicationForm.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input 
                    type="tel"
                    id="phone"
                    name="phone"
                    value={applicationForm.phone}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                  Position Applying For *
                </label>
                <select
                  id="position"
                  name="position"
                  value={selectedJob ? selectedJob.title : applicationForm.position}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select a position</option>
                  {jobPositions.map((job) => (
                    <option key={job.id} value={job.title}>{job.title} - {job.location}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume">
                  Resume/CV (PDF or Word) *
                </label>
                <input 
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverLetter">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={applicationForm.coverLetter}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  placeholder="Tell us why you're interested in this position and what makes you a good fit."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="howHeard">
                  How did you hear about us?
                </label>
                <select
                  id="howHeard"
                  name="howHeard"
                  value={applicationForm.howHeard}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Website">Company Website</option>
                  <option value="JobBoard">Job Board</option>
                  <option value="SocialMedia">Social Media</option>
                  <option value="Employee">Employee Referral</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="flex items-center justify-center">
                <button 
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;