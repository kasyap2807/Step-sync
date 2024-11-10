import React, { useState } from 'react';
// import './App.css'; // Custom styles here

const ManagementDashboard = () => {
    const [activeTab, setActiveTab] = useState('todayUpdate');

    const showTab = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="container mx-auto">
                {/* Management Member Details */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <i className="fas fa-user-tie text-gray-400 text-xl"></i>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">Sai Lakshmi</h4>
                            <p className="text-gray-600">Employee ID: 98765</p>
                            <p className="text-gray-600">Role: Software Engineer</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by date..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Tabs for Updates */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <ul className="flex mb-4">
                        <li className="mr-6">
                            <button
                                onClick={() => showTab('todayUpdate')}
                                className={`text-blue-500 font-semibold focus:outline-none ${activeTab === 'todayUpdate' ? 'active' : ''}`}
                            >
                                Today's Update
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => showTab('allUpdates')}
                                className={`text-blue-500 font-semibold focus:outline-none ${activeTab === 'allUpdates' ? 'active' : ''}`}
                            >
                                All Updates This Month
                            </button>
                        </li>
                    </ul>

                    {/* Today's Update (Initially shown by default) */}
                    {activeTab === 'todayUpdate' && (
                        <div id="todayUpdate" className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
                            <h4 className="text-lg font-bold">June 1, 2024</h4>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <p className="text-gray-600">
                                Status: <span className="text-green-500">Accepted</span>
                            </p>
                        </div>
                    )}

                    {/* All Updates This Month (Initially hidden) */}
                    {activeTab === 'allUpdates' && (
                        <div id="allUpdates">
                            {/* Sample All Updates for the Month */}
                            <div className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
                                <h4 className="text-lg font-bold">May 1, 2024</h4>
                                <p className="text-gray-600">
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="text-gray-600">
                                    Status: <span className="text-red-500">Rejected</span>
                                </p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
                                <h4 className="text-lg font-bold">May 2, 2024</h4>
                                <p className="text-gray-600">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                                <p className="text-gray-600">
                                    Status: <span className="text-green-500">Accepted</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagementDashboard;
