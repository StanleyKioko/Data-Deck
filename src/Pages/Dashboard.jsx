// filepath: c:\Users\HP\Desktop\Folders\datadeck\src\Pages\Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock user authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Mock shipment data
  const shipments = [
    {
      id: 'BL789123',
      origin: 'New York, NY',
      destination: 'Boston, MA',
      status: 'In Transit',
      estimatedDelivery: 'Jul 10, 2025',
      type: 'Express'
    },
    {
      id: 'BL456782',
      origin: 'Chicago, IL',
      destination: 'Denver, CO',
      status: 'Processing',
      estimatedDelivery: 'Jul 12, 2025',
      type: 'Standard'
    },
    {
      id: 'BL123789',
      origin: 'San Francisco, CA',
      destination: 'Los Angeles, CA',
      status: 'Delivered',
      deliveryDate: 'Jul 5, 2025',
      type: 'Express'
    },
    {
      id: 'BL456123',
      origin: 'Seattle, WA',
      destination: 'Portland, OR',
      status: 'Delivered',
      deliveryDate: 'Jul 3, 2025',
      type: 'Standard'
    },
  ];

  // Active tab state
  const [activeTab, setActiveTab] = useState('shipments');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo purposes, any login works
    if (loginForm.email && loginForm.password) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-500';
      case 'In Transit': return 'bg-blue-500';
      case 'Processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Login Form
  const LoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Client Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your shipments and account information
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={loginForm.email}
                onChange={handleLoginChange}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={loginForm.password}
                onChange={handleLoginChange}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
          
          {/* Demo hint */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>For demo purposes, any email and password will work.</p>
          </div>
        </form>
      </div>
    </div>
  );

  // Dashboard Content
  const DashboardContent = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Client Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded transition duration-300"
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Navigation */}
        <div className="mb-8 border-b border-gray-200 flex space-x-8">
          <button
            className={`py-2 px-4 font-semibold ${activeTab === 'shipments' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-600 hover:text-blue-700'}`}
            onClick={() => setActiveTab('shipments')}
          >
            Shipments
          </button>
          <button
            className={`py-2 px-4 font-semibold ${activeTab === 'account' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-600 hover:text-blue-700'}`}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'shipments' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Shipments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BL Number</th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-700">{shipment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{shipment.origin}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{shipment.destination}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 align-middle ${getStatusColor(shipment.status)}`}></span>
                        {shipment.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{shipment.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {shipment.status === 'Delivered'
                          ? <span className="text-green-700 font-semibold">{shipment.deliveryDate}</span>
                          : <span className="text-gray-700">{shipment.estimatedDelivery}</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Account Information</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-700 mb-2"><span className="font-semibold">Name:</span> John Doe</p>
              <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> johndoe@email.com</p>
              <p className="text-gray-700"><span className="font-semibold">Company:</span> Acme Logistics</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return isAuthenticated ? <DashboardContent /> : <LoginForm />;
};

export default Dashboard;