const axios = require("axios");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/helloworld") {
    res.write("Hello world");
    res.end();
  }

  if (req.url === "/api") {
    axios
      .get("https://www.boredapi.com/api/activity")
      .then(function (response) {
        console.log("Entered then on app.js")
        res.write(response.data.activity);
        res.end();
      });
  }

  if (req.url === "/api2") {
    getData(res);
  }
});

const getData = async (res) => {
  try {
    let response = await axios.get("https://www.boredapi.com/api/activity");
    res.write(response.data.activity);
    res.end();
  } catch (error) {
    console.error(error);
  }
};

module.exports=server;
console.log("Server started");
