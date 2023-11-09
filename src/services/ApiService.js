const ApiService = {
    getProviders: () => {
      return fetch('https://api.apis.guru/v2/providers.json').then(response => response.json());
    },
    getWebAPIs: (provider) => {
      return fetch(`https://api.apis.guru/v2/${provider}.json`).then(response => response.json());
    },
    getAPIDetails: (provider, xServiceName, api) => {
      console.log('xServiceName', xServiceName);
      let providerName = provider;
      if(xServiceName && xServiceName!='' && xServiceName !='undefined'){
        console.log('xServiceName',xServiceName)
        providerName+= `:${xServiceName}`;
      }
      
      return fetch(`https://api.apis.guru/v2/specs/${providerName}/${api}.json`).then(response => response.json());
    },
  };
  
  export default ApiService;