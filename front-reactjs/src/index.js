import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store.js'
import { fetchMisc } from './components/stotify/stotifySlice';


import RoutesTree from './components/RoutesTree'


store.dispatch(fetchMisc('artists'))
store.dispatch(fetchMisc('albums'))
store.dispatch(fetchMisc('tracks'))
store.dispatch(fetchMisc('date'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <RoutesTree/>
    </Provider>

  </React.StrictMode>
);