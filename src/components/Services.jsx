import React from "react";
import "../scss/components/_services.scss";
import ServiceCard from "../components/ServicesCard.jsx";
import { FaYoutube } from "react-icons/fa";
import battlesnakeLogo from "../../public/images/battlesnake.png";
import bytecampLogo from "../../public/images/bytecamp.png";

function Services() {
  return (
    <section className="services">
      <h2>
        Develop your own algorithm to find food, stay alive, and eliminate
        others. Battlesnakes are controlled by a web server you deploy, running
        the code you write.
      </h2>
      <div className="cards">
        <ServiceCard
          icon={
            <img
              src={battlesnakeLogo}
              alt="BattleSnake Logo"
              style={{ width: "100px", height: "100px" }}
            />
          }
          title="What is Battlesnake?"
          desc="Battlesnake is a competitive game where your code is the controller. All you need is a web server that responds to the Battlesnake API."
          cta="How it works?"
          link="https://docs.battlesnake.com/"
        />
        <ServiceCard
          icon={<FaYoutube style={{ color: "#FF0000", fontSize: "5rem" }} />}
          title="Tutorial"
          desc="Learn how to create your first Battlesnake with an easy-to-follow video guide to get you started quickly."
          cta="Watch tutorial"
          link="https://www.youtube.com/watch?v=IA7CeGRfuNE"
        />
        <ServiceCard
          icon={
            <img
              src={bytecampLogo}
              alt="ByteCamp Logo"
              style={{ width: "100px", height: "100px" }}
            />
          }
          title="Are you ready to start?"
          desc="Join ByteCamp coding bootcamp and start learning Battlesnake today!"
          cta="Register here"
          link="https://www.bytecamp.ca/#r"
        />
      </div>
    </section>
  );
}

export default Services;
