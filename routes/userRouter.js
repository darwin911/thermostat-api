const express = require("express");
const { User, Entry } = require("../models");
const { hash, compare, encode, verify } = require("../auth");

const userRouter = express.Router();

const code = "ilovebikes";

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, verificationCode } = req.body;
    if (verificationCode === code) {
      const emailExists = await User.findOne({
        where: { email: email }
      });
  
      if (emailExists) {
        return res.status(409).send("This email is already in use.");
      }

      const password_digest = await hash(password);
      const user = User.create({
        name,
        email,
        password_digest
      });
      res.json({ currentUser: { name, email } });
    } else {
      console.log("Verification code is invalid");
      res.json({ err: "Verification code is invalid" });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = userRouter;
