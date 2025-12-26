const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      sparse: true // 👈 allows OAuth users without email conflicts
    },

    // 🔐 Local auth
    password: {
      type: String,
      select: false // 👈 never return password by default
    },

    // 🌐 OAuth providers
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },

    facebookId: {
      type: String,
      unique: true,
      sparse: true
    },

    twitterId: {
      type: String,
      unique: true,
      sparse: true
    },

    provider: {
      type: String,
      enum: ["local", "google", "facebook", "twitter"],
      default: "local"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
