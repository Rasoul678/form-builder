import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <AppLayout>
      <App />
    </AppLayout>
  </StrictMode>
);
