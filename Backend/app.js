const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = require("./Models/User");

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send(`running port : ${PORT}`);
});

app.post("/register", async function (req, res) {
  let { username, password, email, age } = req.body;
  let user = await userModel.findOne({ email });

  if (user) { return res.status(400).send("User already registered"); }
})

app.listen(PORT);