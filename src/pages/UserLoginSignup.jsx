import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const UserLoginSignup = ({ auth }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginToggle, setLoginToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const errorHandle = error?.split('auth/')[1].split(')')[0] || null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };



  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoginToggle(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Task Managment</h2>
        <h2 className="form-title">{loginToggle ? "Sign Up" : "Login"}</h2>

        <form
          onSubmit={loginToggle ? handleSignUp : handleLogin}
          className="login-form"
        >
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-footer">
            <button type="submit" className="submit-btn">
              {loader ? (
                <div className="loader"></div>
              ) : loginToggle ? (
                "Sign Up"
              ) : (
                "Login"
              )}
            </button>
            <button
              className="toggle-btn"
              onClick={() => setLoginToggle(!loginToggle)}
            >
              {loginToggle ? "Login" : "Create Account"}
            </button>
          </div>
          {error && <p className="error-message">{errorHandle.charAt(0).toUpperCase() + errorHandle.slice(1)}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserLoginSignup;
