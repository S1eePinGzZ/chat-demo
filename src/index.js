import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import counter from './reducer';
import thunkMiddleware from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

const store = createStore(
  counter,
  applyMiddleware(
    thunkMiddleware // 允许我们 dispatch() 函数
  ));


ReactDOM.render((
  <Provider store={store}>
    <App store={store}></App>
  </Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
