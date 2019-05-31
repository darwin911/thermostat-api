import React from "react";
// import { Button, Form, Input } from "semantic-ui-react";

const Login = ({ handleChange, handleLogin, formData }) => {
  return (
    <form className="register" onSubmit={handleLogin}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Password"
        required
      />
      <button>Submit</button>
    </form>
  );
};

export default Login;
