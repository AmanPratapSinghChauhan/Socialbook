import React,{useState,StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {Provider as ReduxProvider} from 'react-redux';
import store from './store';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
  </React.StrictMode>
);

