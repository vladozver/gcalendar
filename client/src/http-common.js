import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:9003",
  baseURL: "https://www.vladozver.com:2083/gcalendar/",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});
