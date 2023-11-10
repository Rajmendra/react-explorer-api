import React, { useState, useEffect, lazy, Suspense } from 'react';
import ApiService from '../services/ApiService';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const ToastContainer = lazy(() => import('react-toastify').then(module => ({ default: module.ToastContainer })));
const ProviderItem = lazy(() => import('./ProviderItem'));

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
        if (openSidebar) {
          setIsOpen(true);
        }
        setProviders(p.data)
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
      });
  }, []);

  const hideAllPreviousOne = () => {
    const linkCollapse = document.getElementsByClassName('has-submenu open');
    for (let i = 0; i < linkCollapse.length; i++) {
      linkCollapse[i].classList.toggle('open');
    }
  }

  const handleSidebarToggle = ({ hide }) => {
    hideAllPreviousOne();
    setIsOpen(isOpen && hide ? false : !isOpen);
  };

  const handleSubmenuToggle = async (e, provider) => {
    hideAllPreviousOne();
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
    } catch (error) {
      setLoading(false);
      console.error('Error fetching submenu items:', error);
    }
  };

  return (
    <div className={classNames('container', { overlay: isOpen })}>
      <button className="button" onClick={handleSidebarToggle}>
        Explore Web APIs
      </button>
      <div className={classNames('sidebar', { open: isOpen })}>
        <div className="header sd-header">
          <h4>Select Provider</h4>
        </div>
        <ul className="sidebar-items">
          {providers.map((provider) => (
            <Suspense key={provider} fallback={<div>Loading...</div>}>
              <ProviderItem
                provider={provider}
                isOpen={isOpen}
                selectedProvider={selectedProvider}
                handleSubmenuToggle={handleSubmenuToggle}
                submenuItems={submenuItems}
                isLoading={isLoading}
              />
            </Suspense>
          ))}
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer />
      </Suspense>
    </div>
  );
};

export default Home;