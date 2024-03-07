require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(bodyParser.json());
app.use(cookieParser());

const createToken = (username) =>
  jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "2h" });

/**
 * Middleware function to handle user registration.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.register(username, password);
    const token = createToken(user.username);

    res.cookie("accessToken", token, { httpOnly: true, secure: true });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * Middleware function to handle user login.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user.username);

    res.cookie("accessToken", token, { httpOnly: true, secure: true });

    res.status(200).json({ isAuthenticated: true, username: user.username });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false, message: error.message });
  }
});

/**
 * Middleware function to check user authentication status.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/auth/status", (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "No token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: error.message });
    }

    res.status(200).json({ isAuthenticated: true, username: user.username });
  });
});

/**
 * Middleware function to handle user logout.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/auth/logout", (req, res) => {
  res.cookie("accessToken", "", { maxAge: 0 });

  res.status(200).json({ message: "User logged out successfully" });
});

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to db & listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
