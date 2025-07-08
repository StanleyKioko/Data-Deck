import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill out all required fields.',
      });
      return;
    }

    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
    });

    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  // FAQ Data
  const faqs = [
    {
      question: "What areas do you service?",
      answer: "We provide logistics services globally, with a strong presence in North America, Europe, Asia, and Australia. Our local courier services are available in major metropolitan areas."
    },
    {
      question: "How can I track my shipment?",
      answer: "You can track your shipment by entering your tracking number on our Track page. You'll receive real-time updates on your package's status and location."
    },
    {
      question: "What shipping options do you offer?",
      answer: "We offer a range of shipping options including same-day delivery, next-day delivery, standard shipping, and economy shipping. The availability may vary by location."
    },
    {
      question: "How do I get a shipping quote?",
      answer: "You can request a shipping quote by filling out our contact form or by calling our customer service team. For businesses with regular shipping needs, we offer customized rate plans."
    },
    {
      question: "What items are prohibited for shipping?",
      answer: "Prohibited items include hazardous materials, illegal substances, firearms, certain perishables, and valuables such as cash or jewelry. Please contact us for a complete list of restricted items."
    },
    {
      question: "Do you provide insurance for shipments?",
      answer: "Yes, we offer shipping insurance options for all our delivery services. Basic coverage is included in our standard rates, with options to purchase additional coverage."
    },
  ];

  // Office locations
  const officeLocations = [
    {
      city: "New York",
      address: "123 Logistics Way, New York, NY 10001",
      phone: "+1 (212) 555-1234",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM"
    },
    {
      city: "London",
      address: "456 Shipping Lane, London, EC2A 1AB, UK",
      phone: "+44 20 7123 4567",
      hours: "Mon-Fri: 9:00 AM - 5:30 PM"
    },
    {
      city: "Singapore",
      address: "789 Supply Chain Rd, Singapore 123456",
      phone: "+65 6123 4567",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM"
    },
  ];

  // Component for FAQ item with accordion functionality
  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="border-b border-gray-200">
        <button 
          className="flex justify-between items-center w-full py-4 text-left font-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{question}</span>
          <svg 
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contact Hero Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions or need a quote? Our team is here to help you with all your logistics needs.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {formStatus.submitted && (
              <div className={`p-4 rounded-lg mb-6 ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Office Locations */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              {/* Map would go here */}
              <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                <span>Map showing office locations would be displayed here</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-lg">{office.city}</h3>
                    <p className="text-gray-600 text-sm mb-2">{office.address}</p>
                    <p className="text-gray-600 text-sm mb-1">{office.phone}</p>
                    <p className="text-gray-600 text-sm">{office.hours}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* General Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@blobelogistics.com" className="text-blue-600 hover:underline">info@blobelogistics.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+18005551234" className="text-blue-600 hover:underline">+1 (800) 555-1234</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;