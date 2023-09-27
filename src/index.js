import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from '@auth0/auth0-react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; 
import store from './redux/store'; 




ReactDOM.render(
  <React.StrictMode>
    
    <Provider store={store}>
    
    <Auth0Provider
    domain="dev-r3w4lojvszagpcnm.us.auth0.com"
    clientId="ZeW4XrHfLjOyU88CeOwAhim1GKAIUIYx"
    authorizationParams={{
      redirect_uri: window.location.origin
  }}
  
  >
    <App />
  </Auth0Provider>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
