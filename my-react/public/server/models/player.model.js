const mongoose = require("mongoose");

const Player = mongoose.model("player", {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

module.exports = Player;
