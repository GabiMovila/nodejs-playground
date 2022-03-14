import axios from "axios";
import * as express from "express";
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello world!");
});

app.get("/api", (req, res) => {
  axios.get("https://www.boredapi.com/api/activity").then(function (response) {
    console.log("Entered then on app.js");
    res.send(response.data.activity);
  });
});

app.get("/api2", (req, res) => {
  getData(res);
});

const getData = async (res) => {
  try {
    let response = await axios.get("https://www.boredapi.com/api/activity");
    res.send(response.data.activity);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error.message);
  }
};

export default app;
