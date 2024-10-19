import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppWithRedusers from './AppWithRedusers';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
   <AppWithRedusers/>
  </React.StrictMode>
);

reportWebVitals();
