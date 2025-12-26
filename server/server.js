require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");


// 🔹 IMPORT PASSPORT CONFIG (JUST IMPORT — NO VARIABLE)
require("./config/passport");

const authRoutes = require("./routes/auth");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true
}));

app.use(express.json());

/* ---------- SESSION (REQUIRED FOR OAUTH) ---------- */
app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false
  })
);

/* ---------- PASSPORT ---------- */
app.use(passport.initialize());
app.use(passport.session());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
