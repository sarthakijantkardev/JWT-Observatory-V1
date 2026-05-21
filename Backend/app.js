const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");

const userModel = require("./Models/User");
const sessionModel = require("./Models/Session");

const app = express();
const PORT = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/JWT-Obvt-DB-V1");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

const secret = process.env.JWT_TOKEN || "gwandumarshhhhh";

app.get("/", function (req, res) {
  res.send(`running port : ${PORT}`);
});

app.post("/register", async function (req, res) {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const device = req.headers["user-agent"];
    const language = req.headers["accept-language"];
    const encoding = req.headers["accept-encoding"];
    const method = req.method;
    const url = req.originalUrl;
    const hostname = req.hostname;
    const protocol = req.protocol;
    const isSecure = req.secure;
    const authHeader = req.headers.authorization;
    const cookies = req.cookies;
    const query = req.query;
    const params = req.params;
    const body = req.body;
    const referrer = req.headers.referer;
    const origin = req.headers.origin;
    const contentType = req.headers["content-type"];
    const connection = req.headers.connection;
    const httpVersion = req.httpVersion;
    const rawHeaders = req.rawHeaders;
    const clientPort = req.socket.remotePort;
    const timestamp = new Date();
    const host = req.headers.host;
    const forwarded = req.headers["x-forwarded-for"];
    const realIP = req.headers["x-real-ip"];
    const cacheControl = req.headers["cache-control"];
    const contentLength = req.headers["content-length"];
    const accept = req.headers.accept;

    const { username, password, email, age } = req.body;

    if (!username || !password || !email || !age) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPassword,
      email,
      age
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        device,
        ip
      },
      secret,
      {
        expiresIn: "7d"
      }
    );

    await sessionModel.create({
      userId: user._id,

      username,
      email,

      token,

      ip,
      device,
      language,
      encoding,
      method,
      url,
      hostname,
      protocol,
      isSecure,
      authHeader,
      cookies,
      query,
      params,
      body,
      referrer,
      origin,
      contentType,
      connection,
      httpVersion,
      rawHeaders,
      clientPort,
      timestamp,
      host,
      forwarded,
      realIP,
      cacheControl,
      contentLength,
      accept
    });

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

    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const device = req.headers["user-agent"];

    const existingSession = await sessionModel.findOne({
      userId: user._id,
      ip: { $ne: ip }
    });

    let replayAttack = false;

    if (existingSession) {
      replayAttack = true;
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        device,
        ip
      },
      secret,
      {
        expiresIn: "7d"
      }
    );

    await sessionModel.create({
      userId: user._id,

      username: user.username,
      email: user.email,

      token,

      ip,
      device,

      replayAttack
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Login Success",

      replayAttack,

      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.get("/dashboard", async function (req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const decoded = jwt.verify(token, secret);

    const sessions = await sessionModel
      .find({
        userId: decoded.id
      })
      .sort({ timestamp: -1 });

    res.status(200).json({
      sessions
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});