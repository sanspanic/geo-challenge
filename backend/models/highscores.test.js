const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

const Highscores = require("./highscores.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("get highscores", function () {
  test("works", async function () {
    let res = await Highscores.getHighscores();
    expect(res).toEqual([
      { username: "u2", highscore: 200 },
      { username: "u1", highscore: 100 },
    ]);
  });
});

describe("update highscores", function () {
  test("works", async function () {
    let res = await Highscores.updateHighscore("u1", 500);
    expect(res).toEqual({ highscore: 500 });
  });

  test("works: doesn't update if score smaller than current highscore", async function () {
    let res = await Highscores.updateHighscore("u1", 100);
    expect(res).toEqual({ msg: "No new highscore" });
  });
});
