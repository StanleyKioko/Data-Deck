import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAiResponse } from './aiService';

// Create context
const AiContext = createContext();

// Context provider component
export const AiProvider = ({ children }) => {
  const [aiHistory, setAiHistory] = useState([]);
  const [isAiInitialized, setIsAiInitialized] = useState(false);
  
  // Initialize AI when the app loads
  useEffect(() => {
    const initializeAi = async () => {
      try {
        // Test AI connection on startup
        await getAiResponse("Initialize and test connection");
        setIsAiInitialized(true);
        console.log("AI service initialized successfully");
      } catch (error) {
        console.error("Failed to initialize AI service:", error);
        setIsAiInitialized(false);
      }
    };
    
    initializeAi();
  }, []);
  
  // Function to add to AI interaction history
  const addToAiHistory = (interaction) => {
    setAiHistory(prev => [...prev, interaction]);
  };
  
  // Function to get personalized AI suggestions based on user behavior
  const getPersonalizedSuggestions = async (userContext) => {
    try {
      const prompt = `
        Based on the following user context, provide personalized logistics suggestions:
        - Recent searches: ${userContext.recentSearches || 'None'}
        - Frequently tracked shipments: ${userContext.frequentlyTracked || 'None'}
        - Preferred shipping methods: ${userContext.preferredMethods || 'None'}
        - Common destinations: ${userContext.commonDestinations || 'None'}
        
        Provide 2-3 personalized recommendations that would be helpful for this user.
      `;
      
      const response = await getAiResponse(prompt);
      return response;
    } catch (error) {
      console.error("Error getting personalized suggestions:", error);
      return "Unable to generate personalized suggestions at this time.";
    }
  };
  
  // Provide context value
  const value = {
    isAiInitialized,
    aiHistory,
    addToAiHistory,
    getPersonalizedSuggestions
  };
  
  return <AiContext.Provider value={value}>{children}</AiContext.Provider>;
};

// Custom hook to use the AI context
export const useAi = () => {
  const context = useContext(AiContext);
  if (context === undefined) {
    throw new Error('useAi must be used within an AiProvider');
  }
  return context;
};