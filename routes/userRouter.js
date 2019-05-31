const express = require("express");
const { User, Entry } = require("../models");
const { hash, compare, encode, verify } = require("../auth");

const userRouter = express.Router();

const confirmationCode = "ilovebikes"

userRouter.get('/register', (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log(name, email, password)
    return
  } catch (error) {
    console.error(error)
  }
})

module.exports = userRouter;