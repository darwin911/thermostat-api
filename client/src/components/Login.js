import React from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Login = ({ handleChange, handleLogin, formData }) => {
  return (
    <Form className="login" onSubmit={handleLogin}>
      <Input
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        placeholder="Email"
        autoComplete="email"
        required
      />
      <Input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Password"
        autoComplete="current-password"
        required
      />
      <Button secondary>Log In</Button>
      or <Link to="/register">Register</Link>
    </Form>
  );
};

export default Login;
