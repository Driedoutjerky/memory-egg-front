// Entry point for React frontend. Basically, the first React file that runs in the browser.

// Flow summary
// 1. index.html loads src/main.jsx
// 2. main.jsx imports App.jsx
// 3. main.jsx renders <App />
// 4. user sees the React app.

import { StrictMode } from "react"; // Import React's development checking wrapper
import { createRoot } from "react-dom/client"; // Import function that connects React to the browser DOM.
import App from "./App.jsx"; // Import root component (component: reusable UI function)
import "./styles/global.css";  // Load global design CSS across the whole app.

createRoot(document.getElementById("root")).render( //Find the HTML element with id `root`, and put React app inside it.
  <StrictMode>
    <App />
  </StrictMode>
);