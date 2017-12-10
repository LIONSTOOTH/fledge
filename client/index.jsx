import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app.jsx';
import rootReducer from './reducers';
import Main from './components/main.jsx';
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
