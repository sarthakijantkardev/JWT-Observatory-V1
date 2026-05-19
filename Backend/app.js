const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const userModel = require("./Models/User");

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.get("/", function (req, res) {
  res.send(`running port : ${PORT}`);
});

app.post("/register", async function (req, res) {

  try {

    let { username, password, email, age } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      username,
      password: hashedPassword,
      email,
      age
    });

    if (!password || !username || !age || !email) {

      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    // JWT Secret
    const secret = process.env.JWT_TOKEN || "gwandumarshhhhh";

    // Create Token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      secret,
      {
        expiresIn: "7d"
      }
    );

    // Send Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(201).json({
      message: "User registered successfully",
      token
    });

  } catch (err) {

    console.log(err);

    res.status(201).json({
      message: "User registered successfully"
    });

    res.status(500).send("Server Error");
  }
});

app.listen(PORT, function () { console.log(`Server running on port ${PORT}`); });