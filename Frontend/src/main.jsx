import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import App2 from "./App2.tsx";
import "./i18n/i18n.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <App2 />

  </React.StrictMode>
);
