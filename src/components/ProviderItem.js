import React from 'react';
import classNames from 'classnames';
import { BsChevronCompactDown } from 'react-icons/bs';
import SubmenuItem from './SubMenuItem';

const ProviderItem = ({
  provider,
  selectedProvider,
  handleSubmenuToggle,
  submenuItems,
  isLoading,
  isOpen,
}) => {
  const handleClick = (e) => handleSubmenuToggle(e, provider);

  return (
    <li className={classNames('has-submenu')} onClick={handleClick}>
      <a href="#">
        {provider}
        <span className="arrow">
          <BsChevronCompactDown />
        </span>
      </a>
      {isOpen && (
        <ul className="submenu-items">
          {isLoading && <div className="loading">Loading....</div>}
          {submenuItems && <SubmenuItem provider={selectedProvider} items={submenuItems} />}
        </ul>
      )}
    </li>
  );
};

export default ProviderItem;