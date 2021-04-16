const Highscores = require("../models/highscores");
const express = require("express");
const { ensureLoggedIn, ensureSelf } = require("../middleware/auth");
const router = new express.Router();

// [GET] /
// returns top 10 scores [{username, score}, {username, score}, ...] sorted by desc
// auth required: must be logged in
router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const scores = await Highscores.getHighscores();
    return res.status(200).json({ scores });
  } catch (err) {
    return next(err);
  }
});

router.patch(
  "/:username",
  ensureLoggedIn,
  ensureSelf,
  async function (req, res, next) {
    try {
      const highscore = await Highscores.updateHighscore(
        req.params.username,
        req.body.score
      );
      console.log(highscore);
      return res.status(200).json(highscore);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
