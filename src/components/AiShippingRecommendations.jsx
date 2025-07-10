import React, { useState } from 'react';
import { getShippingRecommendations } from '../utils/aiService';

const AiShippingRecommendations = () => {
  const [packageDetails, setPackageDetails] = useState({
    weight: '',
    dimensions: '',
    origin: '',
    destination: '',
    urgency: 'normal'
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const results = await getShippingRecommendations(packageDetails);
      setRecommendations(results);
      setShowForm(false);
    } catch (error) {
      console.error('Error getting shipping recommendations:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleNewCalculation = () => {
    setShowForm(true);
    setRecommendations([]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">AI Shipping Recommendations</h2>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Package Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={packageDetails.weight}
                onChange={handleChange}
                required
                min="0.1"
                step="0.1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter weight in kg"
              />
            </div>
            
            <div>
              <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">Dimensions (LxWxH cm)</label>
              <input
                type="text"
                id="dimensions"
                name="dimensions"
                value={packageDetails.dimensions}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 30x20x15"
              />
            </div>
            
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={packageDetails.origin}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, Country"
              />
            </div>
            
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={packageDetails.destination}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, Country"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">Delivery Urgency</label>
              <select
                id="urgency"
                name="urgency"
                value={packageDetails.urgency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="economy">Economy (Lowest Cost)</option>
                <option value="normal">Standard (3-5 business days)</option>
                <option value="express">Express (1-2 business days)</option>
                <option value="urgent">Urgent (Same day/Next day)</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Calculating Recommendations...' : 'Get AI Recommendations'}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="font-medium text-blue-800">Package Details:</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">Weight:</span> {packageDetails.weight} kg</div>
              <div><span className="font-medium">Dimensions:</span> {packageDetails.dimensions}</div>
              <div><span className="font-medium">Origin:</span> {packageDetails.origin}</div>
              <div><span className="font-medium">Destination:</span> {packageDetails.destination}</div>
              <div><span className="font-medium">Urgency:</span> {packageDetails.urgency}</div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800">AI Recommended Shipping Options:</h3>
          
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((option) => (
                <div key={option.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
                  <div className="text-md font-medium text-gray-800 mb-2">Option {option.id}</div>
                  <div className="text-gray-600 whitespace-pre-line">{option.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">No recommendations available. Please try different package details.</div>
            </div>
          )}
          
          <button
            onClick={handleNewCalculation}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Calculate for Different Package
          </button>
        </div>
      )}
    </div>
  );
};

export default AiShippingRecommendations;