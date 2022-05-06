import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';

import store from './store.js'
import { fetchMisc } from './components/stotify/stotifySlice';

import Setup from './components/setup/Setup.js'

/*
store.dispatch(fetchMisc('artists'))
store.dispatch(fetchMisc('albums'))
store.dispatch(fetchMisc('tracks'))
store.dispatch(fetchMisc('date'))
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Setup />
    </Provider>
  </React.StrictMode>
);