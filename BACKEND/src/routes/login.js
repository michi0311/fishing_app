/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var router = express.Router();
const path = require("path");
const user = require(path.normalize("../database/models/index")).user;
const hashTool = require(path.normalize("../helpers/hashTool"));

//import Passport and the jwt module
const passport = require(path.normalize(__dirname + "/config/passport"));
const jwt = require("jsonwebtoken");

const jwtSecret = "fishing";

router.post("/", async function (req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    let logUser = undefined;
    try {
      logUser = await user.findOne({ where: { username: username}});
    } catch (e) {
      console.log(e);
      return res.status(500).send(e)
    }

    if (!logUser) {
      return res.status(401).send({ error: "No such User found" });
    }
    const isMatch = await hashTool.compareHash(password, logUser.password);

    if (isMatch) {
      let payload = {
        id: logUser.id,
        email: logUser.email,
        exp: Math.round(Date.now() / 1000) + (60 * 60 * 3) // 3 = 3hours expiration date
      };

      let token = jwt.sign(payload, jwtSecret);
      res.json({
        msg: "ok",
        token: token,
        userame: logUser.username
      });
    } else {
      return res.status(401).json({ error: "Password is incorrect" });
    }
  } else {
    res.status(401).json({ error: "No data provided" });
  }
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send(req.user);
  }
);

module.exports = router;
