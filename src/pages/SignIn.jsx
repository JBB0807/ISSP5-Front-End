import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const googleAuth = () => {
    window.open("https://byte-camp-auth-service.fly.dev/auth/google", "_self");
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Student</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div> */}

        <input
          type="email"
          placeholder="Student Name"
          name="email"
          value={state.email}
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
