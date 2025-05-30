import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import App2 from "./App2.tsx";
import "./i18n/i18n.js"

// Import CSS files in order of precedence
import './assets/css/bootstrap.min.css'
import './assets/css/animate.min.css'
import './assets/css/aos.min.css'
import './assets/css/font-awesome-all.min.css'
import './assets/css/swiper-slider.min.css'
import './assets/css/flex-slider.css'
import './assets/css/select2-min.css'
import './assets/css/video-popup.min.css'
import './assets/css/theme-default.css'
import './assets/css/style.css'
import './assets/css/multirangeSlider.css'
import './assets/css/imageCarousel.css'

import './app.css'

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <App2 />

  </React.StrictMode>
);
