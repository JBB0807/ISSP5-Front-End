import React from 'react';
import '../scss/components/ServicesCard.scss';

function ServiceCard({ icon, title, desc, cta }) {
  return (
    <div className="service-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <a href="#" className="link">{cta} →</a>
    </div>
  );
}

export default ServiceCard;
