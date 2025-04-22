import React from "react";
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
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

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { name, email, password } = state;
    alert(
      `You are signed in with name: ${name} email: ${email} and password: ${password}`
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  const googleAuth = () => {
    window.open("https://byte-camp-auth-service.fly.dev/auth/google", "_self");
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Instructor</h1>
        <div className="social-container">
          <a href="#" className="social" onClick={googleAuth}>
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign in</button>
      </form>
    </div>
  );
}

export default SignUpForm;
