import React from "react";
import "./SnakeSpinner.scss"; 

const SnakeSpinner = () => {
  return (
    <div className="snake-spinner">
      <div className="spinner"></div>
      <div className="text">🐍 Loading Arena...</div>
    </div>
  );
};

export default SnakeSpinner;
