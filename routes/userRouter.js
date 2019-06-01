const express = require("express");
const { User, Thermostat } = require("../models");
const { hash, compare, encode, verify } = require("../auth");

const userRouter = express.Router();

const code = "ilovebikes";

userRouter.post("/register", async (req, res) => {
  const { name, email, password, verificationCode } = req.body;
  // only create user if verification code matches
  if (verificationCode === code) {
    // hashes password input by user
    const password_digest = await hash(password);
    // creates user in database with hashed password
    const user = await User.create({
      name,
      email,
      password_digest
    }).catch(err => console.error(err));
    // constructs userData obj to be encoded as token, and sent to front end to set in state
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    // creates a default thermostat for new user
    const thermostat = await Thermostat.create()
    thermostat.setUser(user)
    // encodes userData
    const token = await encode(userData);
    // returns userData for frontEnd, and token to be stored in localStorage
    res.json({ userData, token });
  } else {
    res.json({ error: "invalid verification code" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user !== null) {
    const isAuthenticated = await compare(password, user.password_digest);
    if (isAuthenticated === true) {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      const token = encode(userData);
      return res.json({ token, userData });
    } else {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
  } else {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
});

userRouter.post("/:user_id/thermostat/:id", async (req, res) => {
  console.log('thermostat api')
})

module.exports = userRouter;
