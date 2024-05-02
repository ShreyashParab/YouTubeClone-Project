import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Reducers from "./Reducers";
import {applyMiddleware,compose} from 'redux'
import {createStore} from 'redux'
import {thunk} from 'redux-thunk'
// import path from 'path'


const store = createStore(Reducers,compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
