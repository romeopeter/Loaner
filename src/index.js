import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

import App from "./components/App";
import store from "./redux/store";
import "./assets/styles/index.css";
import "./assets/styles/main.scss";

import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Axios configuration
const currentUserObj = JSON.parse(localStorage.getItem("USER"));
axios.defaults.baseURL = "https://order-book-online.herokuapp.com/";
axios.defaults.headers.common["Authorization"] = undefined;
if (currentUserObj !== null && currentUserObj !== false) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${currentUserObj.tokens.access}`;
}
axios.defaults.headers.post["Content-Type"] = "application/json";

const options = {
  timeout: 5000,
  position: positions.TOP_LEFT,
  // offset: '30px',
};

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();