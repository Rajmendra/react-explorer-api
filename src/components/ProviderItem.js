import React from 'react';
import classNames from 'classnames';
import { BsChevronCompactDown } from "react-icons/bs";

import SubmenuItem from './SubMenuItem';

const ProviderItem = ({ provider, selectedProvider, handleSubmenuToggle, submenuItems, isLoading, isOpen }) => (
  <li className={classNames('has-submenu')} onClick={(e) => handleSubmenuToggle(e, provider)}>
    <a href="#">
      {provider}
      <span className="arrow"><BsChevronCompactDown/>
      </span>
      
    </a>
   {isOpen &&
   <ul className="submenu-items">{isLoading && <div className='loading'>Loading....</div>}{submenuItems && <SubmenuItem provider={selectedProvider} items={submenuItems}></SubmenuItem>}</ul>}
  </li>
);

export default ProviderItem;