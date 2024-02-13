// index.js
// where your node app starts

// init dotenv 
require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// get current date
app.get("/api/", (req, res) => { 
  const date = new Date();

  res.send({"unix": date.getTime(), "utc": date.toUTCString() })
});


// general api for all dates
app.get("/api/:date?", (req, res) => {

  // getting the date from req params
  let unix = req.params.date;
  
   // validating unix if it has date format
  if (unix.match(/-/g)) {
    // creating a new Date() class to get unix time by passing userDate as arguments
    const date = new Date(unix);

    return res.json({ "unix": date.getTime(), "utc": date.toUTCString() })

  } else if (Number(unix)) {
      const date = new Date(unix * 1000);
      return res.json({"unix": unix, "utc": date.toUTCString()})
    
  }
    res.json({ error: "Invalid Date" });
  

}); 




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(process.env.PORT);
  console.log('Your app is listening on port ' + listener.address().port);
});
