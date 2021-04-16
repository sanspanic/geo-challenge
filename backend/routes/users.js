const jsonschema = require("jsonschema");

const express = require("express");
const { ensureSelf, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
//const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

// [GET] /user/:username
// returns { username, firstName, lastName, email, highscore }
// auth required: logged in + user.username must be :username
router.get(
  "/:username",
  ensureLoggedIn,
  ensureSelf,
  async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }
);

// [PATCH] /users/:username
// updates user details, data can include { username, firstName, lastName, email }, must include password
// returns { username, firstName, lastName, email, highscore , token} - new token created in case user changed username
// auth required: logged in and user.username must be :username
router.patch(
  "/:username",
  ensureLoggedIn,
  ensureSelf,
  async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
      }

      const user = await User.update(req.params.username, req.body);
      const token = createToken(user);
      return res.json({ user, token });
    } catch (err) {
      return next(err);
    }
  }
);

// [DELETE] /users/:username
// auth required: logged in and user.username must be :username
router.delete(
  "/:username",
  ensureLoggedIn,
  ensureSelf,
  async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
