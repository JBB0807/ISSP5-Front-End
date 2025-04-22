import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import "./scss/styles.scss";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Header from "./components/Header";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
