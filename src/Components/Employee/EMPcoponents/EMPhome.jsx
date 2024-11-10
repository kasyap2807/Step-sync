import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import EmployeeDashboard from './addupdate';
import Teamlead from './Teamlead';

function EMPhome() {
    const location = useLocation();
    const data = location.state.jwt;
    const navigate = useNavigate();

    const [userdata, setUserdata] = useState([{
        "attachment": "na",
        "date": "na",
        "designation": "na",
        "details": "na",
        "doj": "na",
        "domine": "na",
        "empid": 0,
        "name": "na",
        "password": "na",
        "subject": "na",
        "type_of_user": 0,
        "verified": 0
    }]);

    const [activeTab, setActiveTab] = useState('todayUpdate');
    const [searchQuery, setSearchQuery] = useState('');

    const showTab = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        const fetchData = async () => {
            let resp = await axios.get('http://127.0.0.1:5000/userdata', {
                headers: {
                    'token': data
                }
            });
            setUserdata(resp.data);
        };

        fetchData();
    }, [data]);

    const handleLogout = () => {
        navigate("/", {
            state: {
                token: ""
            }
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUpdates = userdata.filter(user => 
        moment(user.date).format('YYYY-MM-DD').includes(searchQuery)
    );

    return (
        <div>
            <div className="bg-gray-100 min-h-screen p-4">
                <div className="container mx-auto">
                    {/* Management Member Details */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                <i className="fas fa-user-tie text-gray-400 text-xl"></i>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold">{userdata[0].name}</h4>
                                <p className="text-gray-600">Employee ID: {userdata[0].empid}</p>
                                <p className="text-gray-600">Role: {userdata[0].designation}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
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
                            <li className="mr-6">
                                <button
                                    onClick={() => showTab('allUpdates')}
                                    className={`text-blue-500 font-semibold focus:outline-none ${activeTab === 'allUpdates' ? 'active' : ''}`}
                                >
                                    All Updates
                                </button>
                            </li>
                            <li className="mr-6">
                                <button
                                    onClick={() => showTab('add update')}
                                    className={`text-blue-500 font-semibold focus:outline-none ${activeTab === 'add update' ? 'active' : ''}`}
                                >
                                    Add Updates
                                </button>
                            </li>

                            {
                                userdata[0].type_of_user == 2 && (
                                    <li>
                                <button
                                    onClick={() => showTab('My team Today\'s updates')}
                                    className={`text-blue-500 font-semibold focus:outline-none ${activeTab === 'add update' ? 'active' : ''}`}
                                >
                                    My team Today's updates
                                </button>
                            </li>
                                )
                            }
                        </ul>

                        {/* Today's Update (Initially shown by default) */}
                        {activeTab === 'todayUpdate' && (
                            <div id="todayUpdate" className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
                                <h4 className="text-lg font-bold">{moment(userdata[0].date).format('D MMMM YYYY')}</h4>
                                <p className="text-gray-600">{userdata[0].subject}</p>
                                <p className="text-gray-600">{userdata[0].details}</p>
                                <p className="text-gray-600">
                                    Status: {
                                        userdata[0].status == 1? <span className="text-green-500">Accepted</span> : ( userdata[0].status == 1 ? <span className="text-red-500">Rejected</span> : <span className="text-red-500">pending</span>)
                                    }
                                </p>
                            </div>
                        )}

                        {/* All Updates This Month (Initially hidden) */}
                        {activeTab === 'allUpdates' && (
                            <div id="allUpdates">
                                {/* Search Bar */}
                                 <div className="mb-4">
                                <input
                                type="text"
                                placeholder="Search by date..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                />
                                </div>
                                {/* Iterating over filtered updates to display updates */}
                                {filteredUpdates.map((user, index) => (
                                    <div key={index} className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
                                        <h4 className="text-lg font-bold">{moment(user.date).format('D MMMM YYYY')}</h4>
                                        <p className="text-gray-600">{user.subject}</p>
                                        <p className="text-gray-600">{user.details}</p>
                                        <p className="text-gray-600">
                                            Status: {
                                                user.status == 1? <span className="text-green-500">Accepted</span> : ( user.status == 1 ? <span className="text-red-500">Rejected</span> : <span className="text-red-500">pending</span>)
                                            }
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'add update' && (
                            <div>
                                <EmployeeDashboard userdata={userdata} data={data} />
                            </div>
                        )}

                        {activeTab === 'My team Today\'s updates' && (
                            <div>
                                <Teamlead userdata={userdata} data={data}/>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default EMPhome;
