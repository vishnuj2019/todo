import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/Fonts.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./features/store/store.ts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>
);
