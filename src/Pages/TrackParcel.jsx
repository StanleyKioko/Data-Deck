import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const TrackParcel = () => {
  const [searchParams] = useSearchParams();
  const initialTrackingId = searchParams.get('id') || '';
  
  const [trackingId, setTrackingId] = useState(initialTrackingId);
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mockTrackingData = {
    "TRACK123456": {
      status: "In Transit",
      estimatedDelivery: "July 10, 2025",
      origin: "New York, NY",
      destination: "Los Angeles, CA",
      currentLocation: "Denver, CO",
      events: [
        { date: "July 7, 2025", time: "08:30 AM", location: "New York, NY", status: "Picked up by courier" },
        { date: "July 7, 2025", time: "11:45 AM", location: "New York, NY", status: "Departed sorting facility" },
        { date: "July 8, 2025", time: "02:15 AM", location: "Chicago, IL", status: "Arrived at transit facility" },
        { date: "July 8, 2025", time: "05:30 PM", location: "Chicago, IL", status: "Departed transit facility" },
        { date: "July 8, 2025", time: "10:45 PM", location: "Denver, CO", status: "In transit" }
      ]
    },
    "TRACK789012": {
      status: "Delivered",
      deliveryDate: "July 5, 2025",
      deliveryTime: "2:30 PM",
      origin: "Seattle, WA",
      destination: "Miami, FL",
      signedBy: "J. Smith",
      events: [
        { date: "July 1, 2025", time: "09:15 AM", location: "Seattle, WA", status: "Picked up by courier" },
        { date: "July 1, 2025", time: "04:20 PM", location: "Seattle, WA", status: "Departed sorting facility" },
        { date: "July 3, 2025", time: "11:35 AM", location: "Dallas, TX", status: "Arrived at transit facility" },
        { date: "July 3, 2025", time: "06:45 PM", location: "Dallas, TX", status: "Departed transit facility" },
        { date: "July 5, 2025", time: "09:20 AM", location: "Miami, FL", status: "Out for delivery" },
        { date: "July 5, 2025", time: "02:30 PM", location: "Miami, FL", status: "Delivered" }
      ]
    },
    "TRACK345678": {
      status: "Processing",
      estimatedPickup: "July 9, 2025",
      origin: "Austin, TX",
      destination: "Boston, MA",
      events: [
        { date: "July 8, 2025", time: "11:15 AM", location: "Austin, TX", status: "Order received" },
        { date: "July 8, 2025", time: "02:45 PM", location: "Austin, TX", status: "Processing for shipment" }
      ]
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!trackingId.trim()) {
      setError('Please enter a tracking number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const result = mockTrackingData[trackingId];
      
      if (result) {
        setTrackingResult(result);
        setError('');
      } else {
        setTrackingResult(null);
        setError('Tracking number not found. Please check and try again.');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'In Transit':
        return 'bg-blue-500';
      case 'Processing':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10 text-blue-900">Track Your Parcel</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking number (e.g., TRACK123456)"
                className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 disabled:opacity-70"
              >
                {isLoading ? 'Tracking...' : 'Track Package'}
              </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            <div className="mt-4 text-gray-600">
              <p>Example tracking numbers for testing: TRACK123456, TRACK789012, TRACK345678</p>
            </div>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Tracking your package...</p>
            </div>
          )}

          {trackingResult && !isLoading && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header with status */}
              <div className={`p-6 text-white ${getStatusColor(trackingResult.status)}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{trackingId}</h2>
                    <p className="text-white opacity-90">
                      From {trackingResult.origin} to {trackingResult.destination}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{trackingResult.status}</div>
                    {trackingResult.status === "In Transit" && (
                      <p>Est. Delivery: {trackingResult.estimatedDelivery}</p>
                    )}
                    {trackingResult.status === "Delivered" && (
                      <p>Delivered: {trackingResult.deliveryDate}</p>
                    )}
                    {trackingResult.status === "Processing" && (
                      <p>Est. Pickup: {trackingResult.estimatedPickup}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipment info */}
              <div className="p-6 border-b">
                <h3 className="font-bold text-lg mb-4">Shipment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500">Origin</p>
                    <p className="font-medium">{trackingResult.origin}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Destination</p>
                    <p className="font-medium">{trackingResult.destination}</p>
                  </div>
                  {trackingResult.currentLocation && (
                    <div>
                      <p className="text-gray-500">Current Location</p>
                      <p className="font-medium">{trackingResult.currentLocation}</p>
                    </div>
                  )}
                  {trackingResult.signedBy && (
                    <div>
                      <p className="text-gray-500">Signed By</p>
                      <p className="font-medium">{trackingResult.signedBy}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Map */}
              <div className="p-6 border-b">
                <h3 className="font-bold text-lg mb-4">Shipment Location</h3>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map would be displayed here using Google Maps API</p>
                </div>
              </div>

              {/* Tracking timeline */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-4">Tracking History</h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-gray-200"></div>
                  
                  {trackingResult.events.map((event, index) => (
                    <div key={index} className="flex mb-6 relative">
                      <div className={`h-8 w-8 rounded-full ${index === 0 ? getStatusColor(trackingResult.status) : 'bg-gray-200'} flex-shrink-0 flex items-center justify-center z-10`}>
                        {index === 0 ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        ) : null}
                      </div>
                      <div className="ml-6">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">
                          {event.location} • {event.date} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackParcel;