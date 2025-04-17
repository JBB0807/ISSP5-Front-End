import React from 'react';
import '../scss/components/Services.scss';
import ServiceCard from '../components/ServicesCard.jsx';

function Services() {
  return (
    <section className="services">
      <h2>Develop your own algorithm to find food, stay alive, and eliminate others. Battlesnakes are controlled by a web server you deploy, running the code you write.</h2>
      <div className="cards">
        <ServiceCard
          icon="🖥️"
          title="What is Battlesnake?"
          desc="Battlesnake is a competitive game where your code is the controller. All you need is a web server that responds to the Battlesnake API."
          cta="What how it works"
        />
        <ServiceCard
          icon="🏆"
          title="Leaderboard"
          desc="Choose your tech stack, deploy your Battlesnake, and see how your code ranks against other developers."
          cta="Check the leaderboard"
        />
        <ServiceCard
          icon="💡"
          title="Try new languages and technologies in a high-stakes environment."
          desc="Battlesnake is a great outlet to learn something new and mess around with that platform, language, or library you've been meaning to try"
          cta="Learn more"
        />
      </div>
    </section>
  );
}

export default Services;
