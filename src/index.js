import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserContextProvider from "./context/UserContext";
const root = ReactDom.createRoot(document.getElementById("root"));
const TOKEN = process.env.REACT_APP_GOOGLE_API_TOKEN_ID;
root.render(
  <GoogleOAuthProvider clientId={TOKEN}>
    <UserContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </UserContextProvider>
  </GoogleOAuthProvider>
);
