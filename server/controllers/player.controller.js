const Player = require("../models/player.model");

module.exports = {
  // Create player
  create: async (req, res) => {
    const { username, email, stage, level } = req.body;
    const dataPlayer = await Player.findOne({ username: username });
    if (!dataPlayer) {
      await Player.insertMany({
        username: username,
        email: email,
        stage: stage,
        level: level,
      })
        .then((response) => {
          res.send({
            message: "success create player",
            data: response,
          });
        })
        .catch((err) => {
          res.send({
            message: "Please Input your data first",
          });
        });
    } else {
      res.send({
        message: "Username has been used",
      });
    }
  },

  // Read database player
  read: async (req, res) => {
    await Player.find()
      .then((response) =>
        res.send({
          message: "Data player has been found",
          data: response,
        })
      )
      .catch((err) =>
        res.send({
          message: "Data player cannot be found",
        })
      );
  },

  // update data player
  update: async (req, res) => {
    const { username, email, stage, level } = req.body;
    await Player.updateOne(
      {
        username: username,
      },
      {
        $set: {
          email: email,
          stage: stage,
          level: level,
        },
      }
    ).then((response) => {
      res
        .send({
          message: "Data has been change",
        })
        .catch((err) => {
          res.send({
            message: "Error",
          });
        });
    });
  },

  // delete player
  delete: async (req, res) => {
    await Player.deleteOne({ username: req.body.username });
  },

  // search for player
  find: async (req, res) => {
    const { username = null, email = null, stage = null, level = null } = req.body;
    let query = {};
    if (username) {
      query.username = username;
    }
    if (email) {
      query.email = email;
    }
    if (stage) {
      query.stage = stage;
    }
    if (level) {
      query.level = level;
    }
    const players = await Player.find(query);

    if (players) {
      res.send({
        message: "Data has been found",
        status: 200,
        data: players,
      });
    } else {
      res.send({
        message: "Data player cannot be found",
      });
    }
  },
};
