// Sidebar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/ApiService';

const Sidebar = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    ApiService.getProviders()
      .then(p => setProviders(p.data))
      .catch(error => console.error('Error fetching providers:', error));
  }, []);
  return (
    <div>sidebar
      <ul>
        {providers.length && providers.map(provider => (
          <li key={provider}>
            <Link to={`/web-apis/${provider}`}>{provider}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;