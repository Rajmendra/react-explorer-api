import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { useLocation   } from 'react-router-dom';
import classNames from 'classnames';
import ProviderItem from './ProviderItem';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const search = useLocation().search
  const searchParams = new URLSearchParams(search);

  const openSidebar = searchParams.get('toggel-sidebar');
  useEffect(() => {

    ApiService.getProviders()
      .then((p) => {
        if(openSidebar){
          setIsOpen(true);
        }
        setProviders(p.data)
      })
      .catch((error) => console.error('Error fetching providers:', error));
  }, []);

  const handleSidebarToggle = ({hide}) => {
    setIsOpen(isOpen && hide ?  false : !isOpen);
  };

  const handleSubmenuToggle = async (e, provider) => {
      setSubmenuItems([]);
      setLoading(true);
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.classList.toggle('open');
    try {
      const response = await ApiService.getWebAPIs(provider);
      setSubmenuItems(response.apis);
      setSelectedProvider(provider);
      setLoading(false);
      console.log('EEE')
    } catch (error) {
      setLoading(false);
      console.error('Error fetching submenu items:', error);
    }
  };
  return (
    <div className={classNames('container', { overlay: isOpen })}  onClick={()=> handleSidebarToggle({ hide: isOpen} )}>
    <button className="button" onClick={handleSidebarToggle}>
      Explore Web APIs
    </button>
    <div className={classNames('sidebar', { open: isOpen })}>
      <div className="header sd-header">
        <h4>Select Provider</h4>
      </div>
      <ul className="sidebar-items">
        {providers.map((provider) => (
          <ProviderItem
            key={provider}
            provider={provider}
            isOpen={isOpen}
            selectedProvider={selectedProvider}
            handleSubmenuToggle={handleSubmenuToggle}
            submenuItems={submenuItems}
            isLoading={isLoading}
          >
          </ProviderItem>
        ))}
      </ul>
      
    </div>
  </div>
  );
};

export default Home;