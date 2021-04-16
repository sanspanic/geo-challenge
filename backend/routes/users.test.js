const request = require("supertest");

const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require("./_testCommon");
const { createToken } = require("../helpers/tokens");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// [GET] /users/:username ******************************************

describe("GET /users/:username", function () {
  test("works: if user accessing self", async function () {
    const resp = await request(app)
      .get(`/users/u1`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        highscore: 0,
      },
    });
  });

  test("unauth if user accessing other user", async function () {
    const resp = await request(app)
      .get(`/users/u1`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });
});

// [PATCH] /users/:username *******************************************

describe("PATCH /users/:username", () => {
  test("works: if user updating self", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: "New",
        password: "password1",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "u1@email.com",
        highscore: 0,
      },
      token: createToken({ username: "u1" }),
    });
  });

  test("unauth if user updating other user", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/users/u1`).send({
      firstName: "New",
      password: "password1",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: 42,
        password: "password1",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("works: can set new username", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        password: "password1",
        username: "u1_new",
      })
      .set("authorization", `Bearer ${u1Token}`);
    const u1NewToken = createToken({ username: "u1_new" });
    expect(resp.body).toEqual({
      user: {
        username: "u1_new",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        highscore: 0,
      },
      token: u1NewToken,
    });
  });
});

// [DELETE] /users/:username *******************************************

describe("DELETE /users/:username", function () {
  test("works: if user self", async function () {
    const resp = await request(app)
      .delete(`/users/u1`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: "u1" });
  });

  test("unauth if not same user", async function () {
    const resp = await request(app)
      .delete(`/users/u1`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });
});
