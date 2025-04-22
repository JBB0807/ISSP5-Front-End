import React from "react";
import "../scss/components/Hero.scss";
import Services from "./Services";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="intro">Welcome to Bytecamp!!!</p>
        <h1>Play for Fun!</h1>
        <p className="desc">
          A competitive game where your code is the controller.<br /> All you need is
          a web server that responds to the Battlesnake API.
        </p>
        <button className="cta">Start Battle</button>
      </div>
      <div className="hero-image">
        <div className="hex-bg">
          <img
            src="https://static.battlesnake.com/play/releases/2.1.4/ui/img/game.gif"
            alt="battle snake game"
          />
        </div>
        {/* <div className="tag name-tag">Battle</div>
            <div className="icon top-left">📈</div>
            <div className="icon bottom-right">👁️</div>
            <div className="freelance-tag">Available for Freelance</div> */}
        {/* <div>
          <Services />
        </div> */}
      </div>
    </section>
  );
}

export default Hero;
