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
    const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });

    res.cookie("accessToken", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/auth/status", (req, res) => {
  const token = req.cookies.accessToken;
  // console.log("token :", token);

  if (!token) {
    return res.status(401).json({ isAuthenticated: false, error: "No token" });
  }

  jwt.verify(token, "secret", (error, user) => {
    if (error) {
      return res
        .status(401)
        .json({ isAuthenticated: false, error: error.message });
    }
    return res
      .status(200)
      .json({ isAuthenticated: true, username: user.username });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
