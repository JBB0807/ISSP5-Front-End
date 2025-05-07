// src/components/ServicesCard.jsx
import React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import "../scss/components/_servicesCard.scss";

function ServiceCard({ icon, title, desc, cta, link = "#", index = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Different animation variants based on the card index for a staggered effect
  const getVariants = () => {
    // Alternate between slide-in directions based on index
    const direction = index % 2 === 0 ? 1 : -1;

    return {
      hidden: {
        opacity: 0,
        x: 60 * direction,
        y: 20,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          duration: 0.8,
          delay: index * 0.2, // Stagger effect based on index
          damping: 15,
          stiffness: 100,
        },
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      className="service-card"
      variants={getVariants()}
      initial="hidden"
      animate={controls}
    >
      <div className="card-border"></div>
      <div className="card-glow"></div>

      <motion.div
        className="icon"
        whileHover={{
          scale: 1.2,
          color: "#ff2a6d",
          textShadow: "0 0 10px #ff2a6d",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>

      <motion.h3
        whileHover={{
          scale: 1.05,
          color: "#05d9e8",
          textShadow: "0 0 8px rgba(5, 217, 232, 0.7)",
        }}
      >
        {title}
      </motion.h3>

      <p>{desc}</p>

      <motion.a
        href={link}
        className="link"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          x: 5,
          color: "#ff2a6d",
          transition: { type: "spring", stiffness: 500 },
        }}
      >
        {cta} →
      </motion.a>
    </motion.div>
  );
}

export default ServiceCard;
