import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store.js'

import RoutesTree from './components/RoutesTree'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <RoutesTree/>
    </Provider>

  </React.StrictMode>
);