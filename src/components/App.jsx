import React from "react";
import Messages from "./MessagePage";
import SignUpPage from "./SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/" element={<SignUpPage />} />
        <Route path="/MessagePage/:userId" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
