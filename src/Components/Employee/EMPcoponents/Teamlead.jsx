import React from 'react'
import moment from 'moment';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Teamlead = ({userdata, data}) => {

    const [userdatas, setUserdatas] = useState([{
        "attachment": "na",
        "date": "",
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
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            let resp = await axios.get('http://127.0.0.1:5000/myteam', {
                headers: {
                    'token': data
                }
            });
            setUserdatas(resp.data);
        };

        fetchData();
    }, [data]);

    const filteredUpdates = userdatas.filter(user => 
        user.name.includes(searchQuery)
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

  return (
    <div>
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
        {filteredUpdates.map((user, index) => (
            <div key={index} className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
                <p className="text-gray-600">{user.name}</p>
                <p className="text-gray-600">EMP ID : {user.empid}</p>
                <p className="text-gray-600">{user.designation}</p>
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
  )
}

export default Teamlead