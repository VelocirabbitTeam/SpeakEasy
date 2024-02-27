import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './slices/store.js';
import './main.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <App />
  </Provider>
);
