import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'; // Provider'ı içe aktarın
import store from "./redux/store"
import './index.css';
import App from './App';
import Home from './pages/Home';
import Store from './pages/Store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provider ile Redux store'unu sağlayın */}
      <Router>
        <App>
          <BrowserRouter>
          <Route exact path="/" element={<Home/>}  />
            <Route path="/store" element={<Store/>} />
          </BrowserRouter>
            
          
        </App>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
