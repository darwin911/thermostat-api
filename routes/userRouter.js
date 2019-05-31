const express = require("express");
const { User, Entry } = require("../models");
const { hash, compare, encode, verify } = require("../auth");

const userRouter = express.Router();

const code = "ilovebikes";

userRouter.post("/register", async (req, res) => {
  const { name, email, password, verificationCode } = req.body;
  // only create user if verification code matches
  if (verificationCode === code) {
    const password_digest = await hash(password);
    const user = await User.create({
      name,
      email,
      password_digest
    }).catch(err => console.error(err));
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    const token = await encode(userData);
    res.json({ userData, token });
  } else {
    res.json({ error: "invalid verification code" });
  }
});

module.exports = userRouter;
