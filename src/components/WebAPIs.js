import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../services/ApiService';
import { Link } from 'react-router-dom';

const WebAPIs = () => {
  const { provider } = useParams();
  const [webAPIs, setWebAPIs] = useState([]);

  useEffect(() => {
    ApiService.getWebAPIs(provider)
      .then(data => setWebAPIs(data))
      .catch(error => console.error(`Error fetching Web APIs for ${provider}:`, error));
  }, [provider]);
  console.log('webAPIs', webAPIs);

  return (
    <div>ssad
      <ul>
        {webAPIs.length && webAPIs.map(api => (
          <li key={api}>
            <Link to={`/api-details/${provider}/${api}`}>{api}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebAPIs;