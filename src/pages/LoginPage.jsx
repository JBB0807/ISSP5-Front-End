// Page - Login
import { useEffect, useState } from "react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import "../scss/styles.scss";

const LoginPage = () => {
  const [type, setType] = useState("signIn");

  useEffect(() => {
    document.title = "Login / Instructor";
  }, []);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <main className="login-page">
      <section>
        <h2>Student/Instructor</h2>
        <div className={containerClass} id="container">
          <SignUpForm />
          <SignInForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Please login with your personal info</p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Student
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Instructor!</h1>
                <p>Please enter your personal details here</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Instructor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
