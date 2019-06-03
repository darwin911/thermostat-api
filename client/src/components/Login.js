import React from "react";
// import { Button, Form, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Login = ({ handleChange, handleLogin, formData }) => {
  return (
    <form className="register" onSubmit={handleLogin}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        placeholder="Email"
        autoComplete="email"
        required
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Password"
        autoComplete="current-password"
        required
      />
      <button>Log In</button>
      or
      <Link to="/register">Register</Link>
    </form>
  );
};

export default Login;
