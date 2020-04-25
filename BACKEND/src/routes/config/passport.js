const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
//const JWTSECRET = require('../../../envConfig.json').jwtSecret;

const user = require("../../database/models/index").user;

let extractJWT = passportJWT.ExtractJwt;
let JWTStrategy = passportJWT.Strategy;
let JWTOptions = {};

JWTOptions.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
JWTOptions.secretOrKey = "fishing"

let strategy = new JWTStrategy(JWTOptions, async function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let logUser = await user.findOne({ where: { id: jwt_payload.id } });

  if (logUser && jwt_payload.exp >= Math.round(Date.now() / 1000)) {
    next(null, logUser);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = passport;
