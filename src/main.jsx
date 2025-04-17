import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import "./scss/styles.scss";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <Hero />
    <Services />
    <AppRouter />
    
  </StrictMode>
);
