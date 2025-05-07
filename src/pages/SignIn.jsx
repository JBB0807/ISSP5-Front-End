import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SignInForm() {
  const [state, setState] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in with:\nEmail: ${state.email}\nPassword: ${state.password}`);
    setState({ email: "", password: "" });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "4rem",
        fontFamily: "'Share Tech Mono', monospace",
        color: "#ff2a6d",
      }}
    >
      <div
        style={{
          backgroundColor: "#111",
          padding: "2.5rem",
          borderRadius: "12px",
          border: "1px solid #ff2a6d",
          boxShadow: "0 0 25px #ff2a6d",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#ff2a6d",
            marginBottom: "2rem",
            textShadow: "0 0 10px #ff2a6d",
          }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "6px",
  border: "none",
  background: "#222",
  color: "#ff2a6d",
  fontSize: "1rem",
  outline: "none",
  boxShadow: "0 0 10px #ff2a6d",
};

const buttonStyle = {
  backgroundColor: "#ff2a6d",
  color: "#000",
  border: "none",
  padding: "0.75rem",
  borderRadius: "30px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem",
  boxShadow: "0 0 15px #ff2a6d",
  textShadow: "0 0 5px #fff",
  transition: "transform 0.2s ease-in-out",
};

export default SignInForm;
