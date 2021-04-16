const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const { sqlForPartialUpdate } = require("../helpers/sql");

class User {
  // authenticates user with username, password
  // {username, password} => { username, first_name, last_name, email, highscore }
  // Throws UnauthorizedError is user not found or wrong password
  static async authenticate(username, password) {
    // first, try to find user
    const result = await db.query(
      `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE username = $1`,
      [username]
    );
    const user = result.rows[0];

    if (user) {
      // compare hashed password in db to password input
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password combination.");
  }

  //registers new user
  // {username, password, firstName, lastName, email } => {username, password, firstName, lastName, email}
  // throws BadRequestError on duplicate username
  static async register({ username, password, firstName, lastName, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
      FROM users
      WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username already exists: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
      [username, hashedPassword, firstName, lastName, email]
    );

    const user = result.rows[0];
    return user;
  }

  //given a username, return data about user
  // {username} => {username, password, firstName, lastName, email, highscore}
  //throws NotFoundError if user not found
  static async get(username) {
    const res = await db.query(
      `SELECT username,
      first_name AS "firstName",
      last_name AS "lastName",
        email,
        highscore
        FROM users
        WHERE username = $1`,
      [username]
    );

    const user = res.rows[0];
    if (!user) throw new NotFoundError(`No such user: ${username}`);
    return user;
  }

  //update existing user
  //can be partial update
  //{data} => {username, firstName, lastName, email}
  static async update(username, data) {
    const result = await db.query(
      `SELECT username, password
             FROM users
             WHERE username = $1`,
      [username]
    );
    if (!result.rows[0]) throw new NotFoundError(`No such user: ${username}`);
    const currUser = result.rows[0];

    //compare hashed password in db to input password
    const isValid = await bcrypt.compare(data.password, currUser.password);
    if (!isValid) {
      throw new UnauthorizedError("Invalid password");
    }

    //check for duplicate username only if user changing username
    if (data.username && data.username !== currUser.username) {
      const duplicateCheck = await db.query(
        `SELECT username
            FROM users
            WHERE username = $1`,
        [data.username]
      );

      if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Username already exists: ${data.username}`);
      }
    }

    //remove password so it doesn't get changed
    delete data.password;
    if (Object.keys(data).length === 0) {
      throw new BadRequestError("No data given");
    }
    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
    });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email, highscore`;
    const res = await db.query(querySql, [...values, username]);
    const user = res.rows[0];
    delete user.password;
    return user;
  }

  //remove existing user
  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No such user: ${username}`);
  }
}

module.exports = User;
