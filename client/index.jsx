import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app.jsx';
import rootReducer from './reducers';
import Main from './components/main.jsx';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
