import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const authUrl = import.meta.env.VITE_AUTH_URL;

function SignInForm() {
  const [state, setState] = React.useState({
    qrNumber: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { qrNumber, password } = state;
    console.log(`You are loggind in with email: ${qrNumber} and password: ${password}`);

    console.log("Submitting login request with state:", state);
    fetch(`${authUrl}/auth/student/login`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
      credentials: "include",
    })
      .then((response) => {
      console.log("Received response:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
      })
      .then((data) => {
      console.log("Success:", data);
      window.location.href = "/";
      })
      .catch((error) => {
      console.error("Error occurred during login:", error);
      alert("Login failed!");
      });
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
