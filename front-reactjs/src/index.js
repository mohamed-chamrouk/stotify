import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';

import store from './store.js'
import { fetchMinutes } from './components/stotify/stotifySlice';

store.dispatch(fetchMinutes(2))
//store.dispatch(fetchMinutes(10000))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);