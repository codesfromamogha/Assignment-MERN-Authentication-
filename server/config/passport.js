// require("dotenv").config(); // MUST be first

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

/* =====================================================
   SERIALIZE / DESERIALIZE
===================================================== */
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/* =====================================================
   GOOGLE STRATEGY
===================================================== */
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log("Registering Google strategy...");

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        // ✅ FULL URL — REQUIRED
        callbackURL: "http://localhost:5000/api/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
}

/* =====================================================
   FACEBOOK STRATEGY
===================================================== */
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  console.log("Registering Facebook strategy...");

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/api/auth/facebook/callback",
        profileFields: ["id", "emails", "name"]
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
}

/* =====================================================
   TWITTER STRATEGY
===================================================== */
if (process.env.TWITTER_API_KEY && process.env.TWITTER_API_SECRET) {
  console.log("Registering Twitter strategy...");

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET,
        callbackURL: "http://localhost:5000/api/auth/twitter/callback"
      },
      (token, tokenSecret, profile, done) => {
        return done(null, profile);
      }
    )
  );
}
