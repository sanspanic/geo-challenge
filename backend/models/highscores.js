const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Highscores {
  // get top 10 highscores
  // returns top ten [{ username, score }, {username, score}, ...] in desc order
  static async getHighscores() {
    const result = await db.query(
      `SELECT username, highscore
            FROM users
            ORDER BY highscore 
            DESC
            LIMIT 10`
    );
    const scores = result.rows;
    return scores;
  }

  static async updateHighscore(username, score) {
    const currScore = await db.query(
      `SELECT highscore FROM users WHERE username = $1`,
      [username]
    );
    if (currScore.rows[0].highscore < score) {
      const result = await db.query(
        `UPDATE users
        SET highscore=$1 WHERE username = $2 
        RETURNING highscore`,
        [score, username]
      );
      return result.rows[0];
    } else return { msg: "No new highscore" };
  }
}

module.exports = Highscores;
