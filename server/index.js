const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;

const app = express();
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Cookies: ", req.cookies);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/auth/register", (req, res) => {
  const { username, password } = req.body;

  try {
    // const token = jwt.sign({ user: "admin" }, "secret", { expiresIn: "1h" });
    const token = "token";

    res.cookie("accessToken", token, { httpOnly: true });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  try {
    // const token = jwt.sign({ user: "admin" }, "secret", { expiresIn: "1h" });
    const token = "token";

    res.cookie("accessToken", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/auth/status", (req, res) => {
  const token = req.cookies.token;
  console.log("token :", token);

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  if (token === "token") {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

/* app.get("/auth/status", (req, res) => {
  const token = req.cookies.accessToken; // Assuming 'accessToken' is the name of your cookie

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    jwt.verify(token, "yourSecretKey"); // Replace 'yourSecretKey' with your actual secret key
    res.json({ isAuthenticated: true });
  } catch (err) {
    res.json({ isAuthenticated: false });
  }
}); */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
