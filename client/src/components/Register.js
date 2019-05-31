import React from "react";
// import { Button, Form, Input } from "semantic-ui-react";

const Register = ({ handleChange, handleSubmit, formData }) => {
  return (
    <form className="register" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
        placeholder="Name"
        required
      />

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
      <input
        type="text"
        name="verificationCode"
        onChange={handleChange}
        value={formData.verificationCode}
        placeholder="Verification Code"
        required
      />
      <button>Submit</button>
    </form>
  );
};

export default Register;
