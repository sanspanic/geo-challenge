import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class backendAPI {
  static async request(endpoint, data, method = "get") {
    console.log("API call to:", endpoint, "data: ", data, "method: ", method);

    const token = window.localStorage.getItem("token"); //||
    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbmR5IiwiaWF0IjoxNjE3NzAyMjExfQ.O4MIh_4IdGfZrE48GKzzQS0iFY2NTCp8hp9uav6zOuw";
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      return (await axios({ url, method, data, headers })).data;
    } catch (err) {
      throw err;
    }
  }

  //individual API routes

  static async getHighscores() {
    let res = await this.request("highscores");
    return res.scores;
  }

  static async login(data) {
    let res = await this.request("auth/login", data, "post");
    return res.token;
  }
  static async register(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async updateHighscore(username, data) {
    let res = await this.request(`highscores/${username}`, data, "patch");
    return res;
  }
}

export default backendAPI;
