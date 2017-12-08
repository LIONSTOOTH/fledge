import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/app.jsx'
import reducer from './reducers/main.jsx'
import Main from './components/main.jsx'

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
