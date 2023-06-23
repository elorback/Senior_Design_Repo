import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Store/auth-context";

ReactDOM.render(
  <React.StrictMode>
  <AuthContextProvider>
    {/* BrowserRouter is used to route to different pages of the site */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
