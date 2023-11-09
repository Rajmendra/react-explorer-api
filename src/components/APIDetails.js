import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../services/ApiService';
import { Link } from 'react-router-dom';

const APIDetails = () => {
  const { provider, api, xservicename } = useParams();
  const [apiDetails, setApiDetails] = useState({});
  useEffect(() => {
    ApiService.getAPIDetails(provider, xservicename, api)
      .then(data => {
        console.log('data', data)
        setApiDetails(data)
      })
      .catch(error => console.error(`Error fetching API details for ${provider}/${api}:`, error));
  }, [provider, api]);
  return (
    <div className='detail-container'>
      {apiDetails.info && <div className='inner-container'>
      <h1><img className='img-big' src={apiDetails.info['x-logo'].url} />{apiDetails.info.title}</h1>
      <div>
       <h2> Description</h2>
      </div>
      <div>
        {apiDetails.info.description}
      </div>

      <div>
       <h2> Swagger</h2>
      </div>
      <div>
        {apiDetails.swaggerUrl}
      </div>
      {apiDetails.info.contact && <>
      <div>
       <h2> Contact</h2>
      </div>
      
      <div>
        <div>Email {apiDetails.info.contact.email}</div>
        <div>Name {apiDetails.info.contact.name}</div>
        <div>Url {apiDetails.info.contact.url}</div>
      </div></>}
      <div className='btn-container'>
      <button className="button">
      <Link to={`/?toggel-sidebar=true`}> Explore More APIs</Link>
 
    </button>
        </div>
      </div>}
    </div>
  );
};

export default APIDetails;