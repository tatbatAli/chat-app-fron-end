import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/HomePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
