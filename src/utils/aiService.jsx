import axios from 'axios';

// API key from your provided credentials
const API_KEY = 'f1jrBRLvcFR5Y0pHVy27zCnORrPR4zXJ';

// Base configuration for API calls
const aiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',  // Replace with your actual API endpoint
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

/**
 * Send a message to the AI and get a response
 * @param {string} message - User message
 * @param {string} context - Additional context about the conversation
 * @returns {Promise<string>} - AI response
 */
export const getAiResponse = async (message, context = '') => {
  try {
    const response = await aiClient.post('/chat/completions', {
      model: 'gpt-3.5-turbo',  // Adjust based on your API requirements
      messages: [
        {
          role: 'system',
          content: `You are Blobe Logistics AI assistant. You help with tracking shipments, answering logistics questions, and providing shipping information. ${context}`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error);
    return 'Sorry, I encountered an error. Please try again later.';
  }
};

/**
 * Get shipping recommendations based on package details
 * @param {Object} packageDetails - Details about the package
 * @returns {Promise<Array>} - Array of recommendations
 */
export const getShippingRecommendations = async (packageDetails) => {
  try {
    const prompt = `
      Based on the following package details, provide shipping recommendations:
      - Weight: ${packageDetails.weight} kg
      - Dimensions: ${packageDetails.dimensions}
      - Origin: ${packageDetails.origin}
      - Destination: ${packageDetails.destination}
      - Urgency: ${packageDetails.urgency}
      
      Provide 3 shipping options with estimated cost, delivery time, and benefits.
    `;
    
    const response = await aiClient.post('/completions', {
      model: 'text-davinci-003',  // Adjust based on your API requirements
      prompt,
      temperature: 0.7,
      max_tokens: 500
    });
    
    // Parse the response to extract recommendations
    const recommendations = parseRecommendations(response.data.choices[0].text);
    return recommendations;
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    return [];
  }
};

/**
 * Helper function to parse recommendations from AI response
 */
const parseRecommendations = (text) => {
  // This is a simple implementation - you might need to adjust based on actual response format
  const options = text.split(/Option \d+:/g).filter(option => option.trim());
  return options.map((option, index) => ({
    id: index + 1,
    description: option.trim()
  }));
};

/**
 * AI-powered tracking status enhancement
 * @param {string} trackingNumber - The shipment tracking number
 * @param {Object} basicTrackingData - Basic tracking data from your system
 * @returns {Promise<Object>} - Enhanced tracking information
 */
export const enhanceTrackingInfo = async (trackingNumber, basicTrackingData) => {
  try {
    const prompt = `
      Enhance the following tracking information with detailed status updates and delivery predictions:
      
      Tracking number: ${trackingNumber}
      Current status: ${basicTrackingData.status}
      Current location: ${basicTrackingData.location}
      Origin: ${basicTrackingData.origin}
      Destination: ${basicTrackingData.destination}
      Last update: ${basicTrackingData.lastUpdate}
      
      Provide a detailed analysis of the current status, potential delays, and an estimated delivery window.
    `;
    
    const response = await aiClient.post('/completions', {
      model: 'text-davinci-003',  // Adjust based on your API requirements
      prompt,
      temperature: 0.7,
      max_tokens: 350
    });
    
    return {
      ...basicTrackingData,
      aiEnhancedInfo: response.data.choices[0].text.trim(),
      estimatedDelivery: extractEstimatedDelivery(response.data.choices[0].text)
    };
  } catch (error) {
    console.error('AI Tracking Enhancement Error:', error);
    return basicTrackingData;
  }
};

/**
 * Helper function to extract estimated delivery from AI response
 */
const extractEstimatedDelivery = (text) => {
  // This is a simple implementation - you might need to adjust based on actual response format
  const deliveryMatch = text.match(/delivery.*?(\d{1,2}\/\d{1,2}\/\d{4}|[A-Za-z]+ \d{1,2}, \d{4})/i);
  return deliveryMatch ? deliveryMatch[1] : 'Not available';
};

export default {
  getAiResponse,
  getShippingRecommendations,
  enhanceTrackingInfo
};