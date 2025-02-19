import React from "react";
import Messages from "./MessagePage";
import SignUpPage from "./SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import { Provider } from "react-redux";
import store from "../../redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/" element={<SignUpPage />} />
          <Route path="/MessagePage/:userId" element={<Messages />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
