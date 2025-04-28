import React, { useEffect, useRef } from "react";
import "../scss/components/Hero.scss";

function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create a cyberpunk cursor effect
    const handleMouseMove = (e) => {
      const cursor = document.querySelector(".cyberpunk-cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Matrix digital rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Japanese katakana characters + some latin characters and numbers
    const katakana =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Array to store the y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Function to get a random character from the alphabet
    const getRandomChar = () => {
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    };

    // Drawing the characters
    const draw = () => {
      // Black with opacity to create the fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Green text
      ctx.font = `${fontSize}px monospace`;

      // Loop over each column
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = getRandomChar();

        // Calculate x position (column * fontSize)
        const x = i * fontSize;

        // Calculate y position (current drop position)
        const y = drops[i] * fontSize;

        // Draw the character
        ctx.fillText(text, x, y);

        // Randomly change the character's color to create a glowing effect
        if (Math.random() > 0.975) {
          ctx.fillStyle = "#FFF"; // White for glow effect
          ctx.fillText(text, x, y);
          ctx.fillStyle = "#0F0"; // Back to green
        }

        // Reset the drop when it reaches the bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y coordinate for the drop
        drops[i]++;
      }

      // Call the draw function again on the next frame
      requestAnimationFrame(draw);
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recalculate columns
      const newColumns = canvas.width / fontSize;
      // Adjust drops array
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    // Start the animation
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="matrix-rain"></canvas>
      <div className="hero-cyberpunk-grid"></div>
      <div className="hero-glitch-lines"></div>

      <div className="hero-content">
        <div className="hero-logo-container">
          <img
            src="/images/battlesnake-neon-logo.jpg"
            alt="BattleSnake Neon Logo"
            className="hero-logo"
          />
          <div className="hero-logo-glow"></div>
        </div>

        <div className="hero-cta-container">
          <button className="hero-cta">
            <span className="hero-cta-text">START BATTLE</span>
            <span className="hero-cta-glitch"></span>
          </button>
        </div>
      </div>

      <div className="cyberpunk-cursor"></div>
    </section>
  );
}

export default Hero;
