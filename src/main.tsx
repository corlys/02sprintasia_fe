import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Base } from "./components/Layouts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Base>
      <App />
    </Base>
  </StrictMode>,
);
