import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const basename = import.meta.env.BASE_URL ? import.meta.env.BASE_URL.replace(/\/$/, "") : "/quinzex";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basename || undefined}>
    <App />
  </BrowserRouter>
);
