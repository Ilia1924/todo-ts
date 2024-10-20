import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppWithRedusers from './AppWithRedusers';
import reportWebVitals from './reportWebVitals';
import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './state/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <AppWithRedusers /> */}
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
