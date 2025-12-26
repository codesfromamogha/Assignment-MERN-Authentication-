const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// ✅ IMPORT CONTROLLER CORRECTLY
const authController = require("../controllers/authController");

const router = express.Router();

/* =====================================================
   EMAIL / PASSWORD AUTH
===================================================== */
router.post("/signup", authController.signup);
router.post("/login", authController.login);

/* =====================================================
   GOOGLE OAUTH
===================================================== */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        provider: user.provider
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(
      `http://localhost:3000/oauth-success?token=${token}`
    );
  }
);

module.exports = router;
