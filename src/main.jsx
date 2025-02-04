import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import SingInPage from "./components/SignUp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SingInPage />
  </StrictMode>
);
