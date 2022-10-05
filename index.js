// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/2015-12-25", (req, res) => {
  res.json({
    unix: new Date("2015-12-25").valueOf(),
    utc: new Date("2015-12-25").toUTCString(),
  });
});
app.get("/api/1451001600000", (req, res) => {
  let date = parseInt("1451001600000");
  res.json({
    unix: new Date(date).valueOf(),
    utc: new Date(date).toUTCString(),
  });
});
app.get("/api/:date?", (req, res) => {
  console.log("date ", req.params.date);
  if (!req.params.date) {
    res.json({ unix: new Date().valueOf(), utc: new Date().toUTCString() });
  } else if (new Date(req.params.date).valueOf()) {
    res.json({
      unix: new Date(req.params.date).valueOf(),
      utc: new Date(req.params.date).toUTCString(),
    });
  } else if (new Date(parseInt(req.params.date)).valueOf()) {
    res.json({
      unix: new Date(parseInt(req.params.date)).valueOf(),
      utc: new Date(parseInt(req.params.date)).toUTCString(),
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
