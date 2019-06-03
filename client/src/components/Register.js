import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Register = ({ handleChange, handleSubmit, formData }) => {
  return (
    <Form className="register" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
        placeholder="Name"
        autoComplete="name"
        required
      />

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
      <Input
        type="text"
        name="verificationCode"
        onChange={handleChange}
        value={formData.verificationCode}
        placeholder="Verification Code"
        autoComplete="current-password"
        required
      />
      <Button color="green">Register</Button>
      or 
      <Link to="login">Log In</Link>
    </Form>
  );
};

export default Register;
