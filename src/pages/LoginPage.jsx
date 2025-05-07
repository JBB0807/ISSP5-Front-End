import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const authUrl = import.meta.env.VITE_AUTH_URL;

const LoginPage = () => {
  const [loginState, setLoginState] = React.useState({ email: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with:\nEmail: ${loginState.email}\nPassword: ${loginState.password}`);
    setLoginState({ email: "", password: "" });
  };

  const googleAuth = () => {
    window.open(authUrl, "_self");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Orbitron', sans-serif",
        padding: "2rem",
        backgroundColor: "#0d0221",
        color: "#fff",
        gap: "2rem",
      }}
    >
      {/* Login Box */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "2rem",
          borderRadius: "15px",
          border: "1px solid #05d9e8",
          boxShadow: "0 0 15px #05d9e8",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            color: "#05d9e8",
            textAlign: "center",
            marginBottom: "1.5rem",
            textShadow: "0 0 10px #05d9e8",
          }}
        >
          Login
        </h1>
        <form
          onSubmit={handleLoginSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "transparent", // ✅ FIXED: Removed white background
          }}
        >
          <input
            type="email"
            name="email"
            value={loginState.email}
            onChange={handleLoginChange}
            placeholder="Email"
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            value={loginState.password}
            onChange={handleLoginChange}
            placeholder="Password"
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            SIGN IN
          </button>
        </form>
      </div>

 
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "2rem",
          borderRadius: "15px",
          border: "1px solid #ff2a6d",
          boxShadow: "0 0 15px #ff2a6d",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#ff2a6d",
            marginBottom: "1rem",
            textShadow: "0 0 10px #ff2a6d",
          }}
        >
          Sign Up
        </h2>
        <button onClick={googleAuth} style={googleButtonStyle}>
          <i className="fab fa-google" style={{ marginRight: "10px" }}></i>
          Sign Up with Google
        </button>
      </div>
    </main>
  );
};

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "6px",
  border: "1px solid #05d9e8",
  background: "#000",
  color: "#fff",
  fontSize: "0.95rem",
  fontFamily: "'Orbitron', sans-serif",
  boxShadow: "inset 0 0 6px #05d9e8",
};

const buttonStyle = {
  backgroundColor: "#ff2a6d",
  border: "none",
  padding: "0.75rem",
  borderRadius: "30px",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  textShadow: "0 0 8px #ff2a6d",
  boxShadow: "0 0 15px #ff2a6d",
};

const googleButtonStyle = {
  backgroundColor: "transparent",
  color: "#ff2a6d",
  border: "2px solid #ff2a6d",
  padding: "0.75rem 1.5rem",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  textShadow: "0 0 6px #ff2a6d",
  boxShadow: "0 0 10px #ff2a6d",
};

export default LoginPage;
