const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

//authenticate user
//if token was provided, verify it
//if valid, store the token payload on res.locals
//if no token provided or invalid: not an error
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

//verify if user is logged in, error if not
function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

//verify correct user
function ensureSelf(req, res, next) {
  try {
    const user = res.locals.user;
    if (user.username === req.params.username) {
      return next();
    } else {
      throw new UnauthorizedError();
    }
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureSelf,
};
