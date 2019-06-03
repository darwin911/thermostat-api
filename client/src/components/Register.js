import React from "react";
// import { Button, Form, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Register = ({ handleChange, handleSubmit, formData }) => {
  return (
    <form className="register" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
        placeholder="Name"
        autoComplete="name"
        required
      />

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
      <input
        type="text"
        name="verificationCode"
        onChange={handleChange}
        value={formData.verificationCode}
        placeholder="Verification Code"
        autoComplete="current-password"
        required
      />
      <button>Register</button>
      or
      <Link to="login">Log In</Link>
    </form>
  );
};

export default Register;
