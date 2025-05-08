import React from "react";
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
    console.log(
      `You are loggind in with email: ${qrNumber} and password: ${password}`
    );

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
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Student</h1>

        <input
          type="number"
          placeholder="Assignment QR Number"
          name="qrNumber"
          value={state.qrNumber}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />

        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
