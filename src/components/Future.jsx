import React from 'react';
import { FaUserCog, FaBell, FaLock, FaUsers, FaChartLine, FaCloudUploadAlt } from 'react-icons/fa';

const Future = () => {
  const upcomingFeatures = [
    {
      icon: <FaUserCog className="text-4xl mb-4 text-blue-500" />,
      title: "Account Settings",
      description: "Manage your profile, security settings, and account preferences in one place.",
      status: "Coming with Backend Integration"
    },
    {
      icon: <FaBell className="text-4xl mb-4 text-green-500" />,
      title: "Advanced Notifications",
      description: "Customize how and when you receive notifications across devices.",
      status: "In Development"
    },
    {
      icon: <FaLock className="text-4xl mb-4 text-purple-500" />,
      title: "Enhanced Security",
      description: "Two-factor authentication and advanced security features for your account.",
      status: "Planned"
    },
    {
      icon: <FaUsers className="text-4xl mb-4 text-yellow-500" />,
      title: "Team Collaboration",
      description: "Share tasks and projects with your team members seamlessly.",
      status: "Coming Soon"
    },
    {
      icon: <FaChartLine className="text-4xl mb-4 text-red-500" />,
      title: "Productivity Analytics",
      description: "Track your productivity with detailed analytics and insights.",
      status: "In Planning"
    },
    {
      icon: <FaCloudUploadAlt className="text-4xl mb-4 text-teal-500" />,
      title: "Cloud Sync",
      description: "Access your tasks from any device with our secure cloud sync.",
      status: "Coming with Backend Integration"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
          <p className="text-xl text-gray-600">
            Exciting new features are on the way! Here's a preview of what we're working on.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {feature.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Want to see a feature sooner?</h2>
            <p className="text-xl mb-6">
              We're constantly working to improve our app. Let us know which features you'd like to see next!
            </p>
            <a 
              href="mailto:da16gi@gmail.com?subject=Feature%20Suggestion%20for%20Todo%20App" 
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Suggest a Feature
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Future;