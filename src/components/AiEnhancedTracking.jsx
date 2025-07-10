import React, { useState, useEffect } from 'react';
import { enhanceTrackingInfo } from '../utils/aiService';

const AiEnhancedTracking = ({ trackingNumber, basicTrackingData }) => {
  const [enhancedData, setEnhancedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEnhancedData = async () => {
      if (!trackingNumber || !basicTrackingData) {
        setLoading(false);
        return;
      }

      try {
        const data = await enhanceTrackingInfo(trackingNumber, basicTrackingData);
        setEnhancedData(data);
      } catch (err) {
        console.error('Error enhancing tracking data:', err);
        setError('Unable to retrieve AI-enhanced tracking information.');
      } finally {
        setLoading(false);
      }
    };

    getEnhancedData();
  }, [trackingNumber, basicTrackingData]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!enhancedData) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">AI-Enhanced Tracking Analysis</h3>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-2">
        <div className="bg-indigo-50 rounded-lg p-4 mb-4 text-indigo-900">
          <div className="font-medium mb-1">AI Insights:</div>
          <div className="text-sm whitespace-pre-line">{enhancedData.aiEnhancedInfo}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-600">Estimated Delivery:</div>
            <div className="font-semibold text-blue-800">{enhancedData.estimatedDelivery}</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-600">Current Status:</div>
            <div className="font-semibold text-green-800">{enhancedData.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiEnhancedTracking;