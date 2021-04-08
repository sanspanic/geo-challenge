import axios from "axios";
const BASE_URL =
  "https://restcountries.eu/rest/v2/all?fields=name;capital;flag;";

class geoApi {
  static async getData() {
    try {
      const res = await axios.get(BASE_URL);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}

export default geoApi;
