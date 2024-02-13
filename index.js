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

// get current date
app.get("/api/", (req, res) => {
  const date = new Date();

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// general api for all dates
app.get("/api/:date?", (req, res) => {
  // getting the date from req params
  let dateString = req.params.date;

  if (/\d{5,}/.test(dateString)) {
    dateString = parseInt(dateString);
    return res.json({
      unix: dateString,
      utc: new Date(dateString).toUTCString(),
    });
  } else {
    // Getting the date object of dataString

    let date = new Date(dateString);

    // checking date is Invalid using toString() method
    if (date.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }

    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(process.env.PORT);
  console.log("Your app is listening on port " + listener.address().port);
});
