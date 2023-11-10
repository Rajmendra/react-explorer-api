import React from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';

const SubmenuItem = ({ provider, items }) => (
  <>
    {Object.entries(items).map(([key, item]) => (
      <li key={key}>
        <Link to={`/api-details/${provider}/${item.info['x-serviceName']}/${item.info.version}`}>
          <Image className='submenu-img' url={item.info?.['x-logo']?.url} />
          {item.info.title}
        </Link>
      </li>
    ))}
  </>
);

export default SubmenuItem;