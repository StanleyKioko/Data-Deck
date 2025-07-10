import React, { useState, useEffect, useRef } from 'react';

// Mock data for demonstration purposes
// In a real application, this would come from your database or API
const mockShipmentData = {
  recentShipments: [
    { id: "SH1001", status: "Delivered", destination: "New York, USA", estimatedDelivery: "2025-07-07", actualDelivery: "2025-07-06", delay: false },
    { id: "SH1002", status: "In Transit", destination: "London, UK", estimatedDelivery: "2025-07-10", actualDelivery: null, delay: false },
    { id: "SH1003", status: "Delayed", destination: "Tokyo, Japan", estimatedDelivery: "2025-07-05", actualDelivery: null, delay: true, delayReason: "Customs Clearance" },
    { id: "SH1004", status: "Delivered", destination: "Berlin, Germany", estimatedDelivery: "2025-07-04", actualDelivery: "2025-07-04", delay: false },
    { id: "SH1005", status: "Delayed", destination: "Sydney, Australia", estimatedDelivery: "2025-07-03", actualDelivery: null, delay: true, delayReason: "Weather Conditions" },
    { id: "SH1006", status: "Processing", destination: "Paris, France", estimatedDelivery: "2025-07-12", actualDelivery: null, delay: false },
    { id: "SH1007", status: "Delivered", destination: "Toronto, Canada", estimatedDelivery: "2025-07-02", actualDelivery: "2025-07-03", delay: true, delayReason: "Address Error" },
    { id: "SH1008", status: "In Transit", destination: "Dubai, UAE", estimatedDelivery: "2025-07-11", actualDelivery: null, delay: false },
    { id: "SH1009", status: "Delayed", destination: "Mexico City, Mexico", estimatedDelivery: "2025-07-06", actualDelivery: null, delay: true, delayReason: "Address Error" },
    { id: "SH1010", status: "Delivered", destination: "Singapore", estimatedDelivery: "2025-07-01", actualDelivery: "2025-07-01", delay: false },
    { id: "SH1011", status: "In Transit", destination: "New York, USA", estimatedDelivery: "2025-07-13", actualDelivery: null, delay: false },
    { id: "SH1012", status: "Delivered", destination: "London, UK", estimatedDelivery: "2025-06-30", actualDelivery: "2025-06-30", delay: false },
    { id: "SH1013", status: "Delivered", destination: "Tokyo, Japan", estimatedDelivery: "2025-06-29", actualDelivery: "2025-07-01", delay: true, delayReason: "Customs Clearance" },
    { id: "SH1014", status: "In Transit", destination: "Berlin, Germany", estimatedDelivery: "2025-07-14", actualDelivery: null, delay: false },
    { id: "SH1015", status: "Delivered", destination: "Mumbai, India", estimatedDelivery: "2025-07-02", actualDelivery: "2025-07-04", delay: true, delayReason: "Local Transportation Delay" },
  ],
  businessAnalytics: {
    monthlyDelays: {
      "2025-05": 8,
      "2025-06": 5,
      "2025-07": 4
    },
    topDestinations: [
      { destination: "New York, USA", count: 247 },
      { destination: "London, UK", count: 183 },
      { destination: "Tokyo, Japan", count: 142 },
      { destination: "Berlin, Germany", count: 118 },
      { destination: "Sydney, Australia", count: 97 }
    ],
    deliveryPerformance: {
      onTime: 92.3,
      delayed: 7.7,
      averageDelay: 1.8 // in days
    },
    commonDelayReasons: [
      { reason: "Customs Clearance", percentage: 41 },
      { reason: "Weather Conditions", percentage: 23 },
      { reason: "Address Error", percentage: 18 },
      { reason: "Local Transportation Delay", percentage: 12 },
      { reason: "Other", percentage: 6 }
    ]
  },
  scheduleData: {
    availablePickupSlots: [
      { date: "2025-07-10", slots: ["09:00-12:00", "13:00-16:00", "17:00-19:00"] },
      { date: "2025-07-11", slots: ["09:00-12:00", "13:00-16:00"] },
      { date: "2025-07-12", slots: ["10:00-13:00", "14:00-17:00"] },
      { date: "2025-07-13", slots: ["09:00-12:00", "13:00-16:00", "17:00-19:00"] }
    ],
    customsClearanceDates: [
      { shipmentId: "SH1002", deadline: "2025-07-09" },
      { shipmentId: "SH1006", deadline: "2025-07-11" },
      { shipmentId: "SH1008", deadline: "2025-07-10" },
      { shipmentId: "SH1011", deadline: "2025-07-12" },
      { shipmentId: "SH1014", deadline: "2025-07-13" }
    ]
  }
};

// Website content for AI-powered search
const websiteContent = {
  pages: [
    {
      title: "Fleet Management",
      url: "/services/fleet-management",
      content: "Our Fleet Management solutions optimize your delivery operations with real-time tracking, route optimization, and performance analytics. We help businesses of all sizes manage their vehicle fleets efficiently with customizable dashboards and automated maintenance scheduling."
    },
    {
      title: "Become a Delivery Partner",
      url: "/careers/delivery-partner",
      content: "Join our network of trusted delivery partners. Blobe Logistics offers competitive compensation, flexible scheduling, and access to our proprietary logistics technology. Apply online by submitting your vehicle information, proof of insurance, and completing our onboarding process."
    },
    {
      title: "International Shipping",
      url: "/services/international-shipping",
      content: "Our international shipping services cover over 200 countries with customs brokerage, documentation assistance, and competitive rates. We handle everything from small parcels to freight shipments with specialized options for time-sensitive deliveries."
    },
    {
      title: "Sustainability Initiatives",
      url: "/about/sustainability",
      content: "Blobe Logistics is committed to reducing our environmental impact through carbon-neutral shipping options, electric delivery vehicles, and optimized routing to minimize emissions. Our warehouses operate on renewable energy, and we offer eco-friendly packaging alternatives."
    }
  ]
};

const AiChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm Blobe Logistics AI assistant. How can I help you today? You can ask me about tracking shipments, shipping options, or any logistics questions.", 
      sender: 'ai' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const MISTRAL_API_KEY = 'f1jrBRLvcFR5Y0pHVy27zCnORrPR4zXJ'; // Your Mistral AI API key
  const [conversationHistory, setConversationHistory] = useState([]);

  // Voice recognition setup
  let recognition = null;

  useEffect(() => {
    // Initialize speech recognition if supported by browser
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        // Submit the voice input automatically
        setTimeout(() => {
          handleSendMessage({ preventDefault: () => {} });
        }, 500);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Website information context - this provides information about your website to the AI
  const websiteContext = `
    ABOUT BLOBE LOGISTICS:
    Blobe Logistics is a global logistics provider founded in 2010 with operations in over 50 countries.
    We specialize in freight services, courier delivery, warehousing, and supply chain management.
    Our mission is to make global logistics accessible, efficient, and sustainable.
    
    SERVICES:
    1. Freight Services: Air, ocean, and ground transportation for businesses of all sizes.
    2. Courier Services: Fast and reliable delivery for documents and small parcels.
    3. Warehousing: Secure storage solutions with inventory management systems.
    4. Fleet Management: Optimized fleet operations for maximum efficiency.
    
    TRACKING:
    Customers can track shipments via our tracking form at the top of the website by entering their tracking number.
    
    TESTIMONIALS:
    - John Smith from Tech Solutions Inc.: "Blobe Logistics has transformed our supply chain with their efficient delivery services."
    - Sarah Johnson from Retail Enterprises: "Their warehousing solutions helped us scale our operations during peak seasons."
    - Michael Chen from Global Imports: "The international freight service is impeccable. Timely deliveries and careful handling of our products."
    
    CAREERS:
    We're hiring for various positions. Candidates can apply through our Careers page at blobelogistics.com/careers.
    
    DELIVERY TIMES:
    - Standard shipping: 3-5 business days domestically
    - Express shipping: 1-2 business days
    - International shipping: 7-14 days depending on customs clearance
    
    CONTACT:
    Email: support@blobelogistics.com
    Phone: 1-800-BLOBE-LOG (1-800-256-2356)
    Support Hours: Monday-Friday 8am-8pm EST, Saturday 9am-5pm EST
    
    PARTNERS:
    Trusted by industry leaders including TechGlobal, EcoShip, FastTrack, MegaRetail, GoldTrans, and InfiniteCo.
  `;

  // Function to check if the message is requesting shipment summarization
  const isAskingForShipmentSummary = (message) => {
    const keywords = ['summarize shipments', 'shipment summary', 'shipping status', 'delivery status', 
                     'all my shipments', 'shipment overview', 'delivery overview', 'package status'];
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  // Function to check if the message is a business analytics question
  const isBusinessAnalyticsQuestion = (message) => {
    // Keywords that indicate business analytics questions
    const analyticsKeywords = ['how many', 'what percentage', 'statistics', 'analytics', 'metrics', 'performance', 
                             'delays', 'on-time', 'most frequent', 'average', 'trend', 'compare', 'report'];
    
    // Check if message contains analytics keywords
    return analyticsKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  // Function to check if the message is about website search
  const isWebsiteSearchQuestion = (message) => {
    const searchKeywords = ['find information', 'where can i find', 'looking for', 'search for', 'locate', 
                           'how do i find', 'where is', 'show me', 'find page'];
    return searchKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  // Function to check if the message is about scheduling
  const isSchedulingRequest = (message) => {
    const schedulingKeywords = ['schedule', 'booking', 'appointment', 'pickup', 'pick up', 'available time', 
                               'when can', 'delivery time', 'set up', 'arrange', 'reservation'];
    return schedulingKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  // Function to generate shipment summary
  const generateShipmentSummary = () => {
    const shipments = mockShipmentData.recentShipments;
    const total = shipments.length;
    const delivered = shipments.filter(s => s.status === "Delivered").length;
    const inTransit = shipments.filter(s => s.status === "In Transit").length;
    const delayed = shipments.filter(s => s.delay).length;
    
    // Count delay reasons
    const delayReasons = {};
    shipments.filter(s => s.delay).forEach(s => {
      if (!delayReasons[s.delayReason]) {
        delayReasons[s.delayReason] = 0;
      }
      delayReasons[s.delayReason]++;
    });
    
    // Format delay reasons into text
    const delayReasonsText = Object.entries(delayReasons)
      .map(([reason, count]) => `${count} due to ${reason.toLowerCase()}`)
      .join(', ');
    
    // Generate the summary
    return `📦 Shipment Summary (Past 2 Weeks):

Out of ${total} recent shipments, ${delivered} have been delivered, ${inTransit} are in transit, and ${delayed} are currently delayed (${delayReasonsText}).

${delivered > total * 0.8 ? "Overall delivery performance is excellent." : 
  delivered > total * 0.6 ? "Overall delivery performance is good." : 
  "We're working to improve delivery performance."}

Would you like more detailed information about any specific shipment?`;
  };

  // Function to answer business analytics questions
  const answerBusinessAnalyticsQuestion = (question) => {
    const analytics = mockShipmentData.businessAnalytics;
    question = question.toLowerCase();
    
    // Handle questions about delays
    if (question.includes('delay') && question.includes('last month')) {
      const lastMonth = "2025-06"; // This would dynamically determine the previous month in a real app
      return `In June 2025, we had ${analytics.monthlyDelays[lastMonth]} delayed shipments. This represents approximately ${analytics.deliveryPerformance.delayed}% of total shipments for the month. The most common reason for delays was ${analytics.commonDelayReasons[0].reason}, accounting for ${analytics.commonDelayReasons[0].percentage}% of all delays.`;
    }
    
    // Handle questions about destinations
    if (question.includes('frequent') && question.includes('destination')) {
      const topDestination = analytics.topDestinations[0];
      return `Our most frequent international destination is ${topDestination.destination}, with ${topDestination.count} shipments in the past quarter. This is followed by ${analytics.topDestinations[1].destination} (${analytics.topDestinations[1].count} shipments) and ${analytics.topDestinations[2].destination} (${analytics.topDestinations[2].count} shipments).`;
    }
    
    // Handle questions about general performance
    if (question.includes('performance') || question.includes('on time') || question.includes('on-time')) {
      return `Our current delivery performance shows an on-time delivery rate of ${analytics.deliveryPerformance.onTime}%. For delayed shipments, the average delay is ${analytics.deliveryPerformance.averageDelay} days. The primary causes of delays are: ${analytics.commonDelayReasons.slice(0, 3).map(r => r.reason).join(', ')}.`;
    }
    
    // Default analytics response
    return `I don't have specific data for that question. Here are some key metrics I can share:
- On-time delivery rate: ${analytics.deliveryPerformance.onTime}%
- Top destination: ${analytics.topDestinations[0].destination}
- Most common delay reason: ${analytics.commonDelayReasons[0].reason}

Would you like to know more about any of these areas?`;
  };

  // Function to search website content
  const searchWebsiteContent = (query) => {
    query = query.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;
    
    // Simple fuzzy search implementation
    websiteContent.pages.forEach(page => {
      // Calculate a simple match score based on keyword presence
      let score = 0;
      const contentLower = page.content.toLowerCase();
      const titleLower = page.title.toLowerCase();
      
      // Check for query words in the content
      query.split(' ').forEach(word => {
        if (word.length > 3) { // Only consider meaningful words
          if (contentLower.includes(word)) score += 5;
          if (titleLower.includes(word)) score += 10;
        }
      });
      
      // Update best match if this page has a higher score
      if (score > highestScore) {
        highestScore = score;
        bestMatch = page;
      }
    });
    
    // Generate response based on search results
    if (bestMatch && highestScore > 0) {
      return `I found information about that on our ${bestMatch.title} page. Here's what you need to know:

${bestMatch.content}

You can visit ${bestMatch.url} for more details.`;
    } else {
      return `I couldn't find specific information about that on our website. Please try rephrasing your question, or you can browse our services section for more information.`;
    }
  };

  // Function to handle scheduling requests
  const handleSchedulingRequest = (request) => {
    request = request.toLowerCase();
    const scheduleData = mockShipmentData.scheduleData;
    
    // Handle pickup scheduling
    if (request.includes('pickup') || request.includes('pick up')) {
      const availableDates = scheduleData.availablePickupSlots.map(slot => {
        const date = new Date(slot.date);
        return `${date.toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric'})}: ${slot.slots.join(', ')}`;
      }).join('\n');
      
      return `I can help you schedule a pickup. Here are our available slots for the next few days:

${availableDates}

Would you like me to book one of these slots for you? Just let me know which date and time works best.`;
    }
    
    // Handle customs clearance reminders
    if (request.includes('customs') || request.includes('clearance')) {
      if (scheduleData.customsClearanceDates.length > 0) {
        const upcomingDeadlines = scheduleData.customsClearanceDates.map(item => {
          const deadline = new Date(item.deadline);
          return `Shipment ${item.shipmentId}: ${deadline.toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric'})}`;
        }).join('\n');
        
        return `Here are the upcoming customs clearance deadlines for your shipments:

${upcomingDeadlines}

Would you like me to set reminders for these deadlines?`;
      } else {
        return `You don't currently have any shipments requiring customs clearance. Is there something else you'd like to schedule?`;
      }
    }
    
    // General scheduling response
    return `I can help you schedule pickups, deliveries, or set reminders for customs clearance. What specific type of appointment would you like to make?`;
  };

  // Function to call Mistral AI API
  const getMistralResponse = async (userMessage) => {
    // First check special message types that use our built-in functionalities
    if (isAskingForShipmentSummary(userMessage)) {
      return generateShipmentSummary();
    }
    
    if (isBusinessAnalyticsQuestion(userMessage)) {
      return answerBusinessAnalyticsQuestion(userMessage);
    }
    
    if (isWebsiteSearchQuestion(userMessage)) {
      return searchWebsiteContent(userMessage);
    }
    
    if (isSchedulingRequest(userMessage)) {
      return handleSchedulingRequest(userMessage);
    }
    
    // For all other queries, use the Mistral AI API
    try {
      // Build conversation history for context
      const fullHistory = [
        {
          role: "system",
          content: `You are Blobe Logistics AI assistant. You help users with logistics questions and provide information about our services. 
          Be friendly, professional, and concise. Here is information about our website and company that you should use to answer questions:
          ${websiteContext}
          
          If you don't know the answer to a specific question, suggest contacting our customer service.
          If users ask about tracking a specific shipment, tell them to enter their tracking number in the tracking form.
          When referring to pages on our website, mention that they can find them in the navigation menu.`
        },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ];
      
      // Make API call to Mistral AI
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`
        },
        body: JSON.stringify({
          model: "mistral-small-latest", // or another Mistral model
          messages: fullHistory,
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      const aiReply = data.choices[0].message.content;
      
      // Update conversation history for context
      setConversationHistory(prev => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "assistant", content: aiReply }
      ]);
      
      return aiReply;
      
    } catch (error) {
      console.error('Error calling Mistral AI:', error);
      
      // Fallback responses when API fails
      const fallbackResponses = [
        "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again or contact our customer service at support@blobelogistics.com.",
        "It seems I'm experiencing a temporary issue. For immediate assistance, please call us at 1-800-BLOBE-LOG or use the contact form on our website.",
        "I apologize, but I couldn't process your request at the moment. Please try again later or reach out to our team directly for help."
      ];
      
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  };

  // Function to toggle speech recognition
  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Function to speak text aloud
  const speakText = (text) => {
    if (!isSpeaking && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error('Speech synthesis error', event);
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText.trim(),
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    try {
      // Get response from Mistral AI
      const aiResponse = await getMistralResponse(inputText.trim());
      
      // Add AI message
      setMessages(prev => [
        ...prev, 
        {
          id: prev.length + 1,
          text: aiResponse,
          sender: 'ai'
        }
      ]);

      // Optionally speak the response if the feature is enabled
      // This could be toggled based on user preference
      // speakText(aiResponse);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [
        ...prev, 
        {
          id: prev.length + 1,
          text: "I'm sorry, I encountered a temporary issue. Please try again or contact our customer service at support@blobelogistics.com.",
          sender: 'ai'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // If chatbot is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-white rounded-lg shadow-xl flex flex-col z-50 max-h-[70vh] border border-gray-200">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-medium">Blobe Logistics Assistant</h3>
        </div>
        <div className="flex items-center">
          {/* Voice input toggle button */}
          <button 
            onClick={toggleListening}
            className={`p-2 rounded-full mr-2 ${isListening ? 'bg-red-500' : 'hover:bg-blue-700'}`} 
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div 
              className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
              }`}
            >
              {message.text}
            </div>
            {message.sender === 'ai' && (
              <button 
                onClick={() => speakText(message.text)} 
                className={`ml-2 text-gray-500 hover:text-blue-600 ${isSpeaking ? 'text-blue-600' : ''}`}
                title="Listen to response"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 012.828-2.828" />
                </svg>
              </button>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center text-gray-500 text-sm">
            <div className="dot-typing"></div>
            <span className="ml-2">AI is thinking...</span>
          </div>
        )}
        {isListening && (
          <div className="flex items-center justify-center my-2">
            <div className="animate-pulse text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="ml-2 text-sm text-red-500">Listening...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Function Buttons */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center"
            onClick={() => {
              setInputText("Summarize my recent shipments");
              setTimeout(() => {
                handleSendMessage({ preventDefault: () => {} });
              }, 100);
            }}
          >
            <span className="mr-1">📦</span>
            Shipment Summary
          </button>
          <button 
            className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-full flex items-center"
            onClick={() => {
              setInputText("Schedule a pickup");
              setTimeout(() => {
                handleSendMessage({ preventDefault: () => {} });
              }, 100);
            }}
          >
            <span className="mr-1">📅</span>
            Schedule Pickup
          </button>
          <button 
            className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full flex items-center"
            onClick={() => {
              setInputText("Where can I find fleet management info?");
              setTimeout(() => {
                handleSendMessage({ preventDefault: () => {} });
              }, 100);
            }}
          >
            <span className="mr-1">🔎</span>
            Find Info
          </button>
        </div>
      </div>
      
      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
              onClick={() => {
                setInputText("How can I track my shipment?");
                setTimeout(() => {
                  handleSendMessage({ preventDefault: () => {} });
                }, 100);
              }}
            >
              How can I track my shipment?
            </button>
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
              onClick={() => {
                setInputText("What do your clients say?");
                setTimeout(() => {
                  handleSendMessage({ preventDefault: () => {} });
                }, 100);
              }}
            >
              What do your clients say?
            </button>
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
              onClick={() => {
                setInputText("How many shipments were delayed last month?");
                setTimeout(() => {
                  handleSendMessage({ preventDefault: () => {} });
                }, 100);
              }}
            >
              Shipment delays last month?
            </button>
          </div>
        </div>
      )}
      
      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isListening ? "Listening..." : "Type your message..."}
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isTyping || isListening}
        />
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg ${
            (isTyping || isListening || !inputText.trim()) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isTyping || isListening || !inputText.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
      
      {/* CSS for typing animation */}
      <style jsx>{`
        .dot-typing {
          position: relative;
          left: -9999px;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          background-color: #9880ff;
          color: #9880ff;
          box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
          animation: dotTyping 1.5s infinite linear;
        }

        @keyframes dotTyping {
          0% {
            box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
          }
          16.667% {
            box-shadow: 9984px -10px 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
          }
          33.333% {
            box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
          }
          50% {
            box-shadow: 9984px 0 0 0 #9880ff, 9999px -10px 0 0 #9880ff, 10014px 0 0 0 #9880ff;
          }
          66.667% {
            box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
          }
          83.333% {
            box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px -10px 0 0 #9880ff;
          }
          100% {
            box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
          }
        }
      `}</style>
    </div>
  );
};

export default AiChatBot;