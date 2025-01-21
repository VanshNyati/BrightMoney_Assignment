import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new method
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/Store';

// Use ReactDOM.createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
