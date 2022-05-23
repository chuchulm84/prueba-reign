import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./atoms/css/bootstrap.min.css";
import "./atoms/css/clean.min.css";
import "./atoms/css/pixeladmin.min.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
