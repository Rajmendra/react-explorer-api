import React from 'react';
import { Link } from 'react-router-dom';
const SubmenuItem = ({ provider, items }) => (
  <>
    {Object.entries(items).map((item) => (
      <li key={item}>
        <Link to={`/api-details/${provider}/${item[1].info['x-serviceName']}/${item[1].info.version}`}><img className='submenu-img' src={item[1].info['x-logo'].url} />{item[1].info.title}</Link>
        
      </li>
    ))}
  </>
);

export default SubmenuItem;