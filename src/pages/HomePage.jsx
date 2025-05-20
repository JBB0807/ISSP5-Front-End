// Page - Home
import { useEffect } from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";

const PageHome = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="homepage-container">
      <main>
        <Hero />
        <Services />
      </main>
    </div>
  );
};

export default PageHome;
