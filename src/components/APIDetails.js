import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApiService from '../services/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Image = lazy(() => import('./Image'));

const InfoRow = ({ label, value }) => (
  <div className='inner-row'>
    {label} {value}
  </div>
);

const ContactInfo = ({ contact }) => (
  <div>
    {contact.email && <InfoRow label="Email" value={contact.email} />}
    {contact.name && <InfoRow label="Name" value={contact.name} />}
    {contact.url && <InfoRow label="Url" value={contact.url} />}
  </div>
);

const ApiHeader = ({ apiDetails }) => (
  <div className='header'>
    <h1>
      <Suspense fallback={<div>Loading image...</div>}>
        <Image className='img-big' url={apiDetails?.['x-logo']?.url} />
      </Suspense>
      {apiDetails.title}
    </h1>
  </div>
);

const ApiDescription = ({ description }) => (
  <div>
    <div className='row'>
      <h2> Description</h2>
    </div>
    <div>{description}</div>
  </div>
);

const ApiSwagger = ({ swaggerUrl }) => (
  <div>
    <div className='row'>
      <h2> Swagger</h2>
    </div>
    <div>{swaggerUrl}</div>
  </div>
);

const ApiContact = ({ contact }) => (
  <>
    <div className='row'>
      <h2> Contact</h2>
    </div>
    <ContactInfo contact={contact} />
  </>
);

const APIDetails = () => {
  const { provider, api, xservicename } = useParams();
  const [apiDetails, setApiDetails] = useState({});

  useEffect(() => {
    ApiService.getAPIDetails(provider, xservicename, api)
      .then(data => setApiDetails(data))
      .catch(error => {
        toast.error(`Failed to fetch API details. Please try again.`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        console.error(`Error fetching API details for ${provider}/${api}:`, error);
      });
  }, [provider, api]);

  return (
    <div className='detail-container'>
      {apiDetails.info && (
        <div className='inner-container'>
          <ApiHeader apiDetails={apiDetails.info} />
          <ApiDescription description={apiDetails.info.description} />
          <ApiSwagger swaggerUrl={apiDetails.swaggerUrl} />
          {apiDetails.info.contact && (
            <ApiContact contact={apiDetails.info.contact} />
          )}
          <div className='btn-container'>
            <button className="button">
              <Link to={`/?toggle-sidebar=true`}> Explore More APIs</Link>
            </button>
          </div>
        </div>
      )}
      <Suspense fallback={<div>Loading toastify...</div>}>
        <ToastContainer />
      </Suspense>
    </div>
  );
};

export default APIDetails;