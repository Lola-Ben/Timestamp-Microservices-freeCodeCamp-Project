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

// general api for all dates
app.get("/api/:date?", (req, res) => {

  // getting the date from req params
  let unix = req.params.date;
   // validating unix if it has date format
  if (unix.match(/-/g)) {
    // splitting the user date to get [yy,mm,dd]
    const userDate = unix.split('-');
    
    // creating a new Date() class to get unix time by passing userDate as arguments
    unix = new Date(userDate[0], userDate[1], userDate[2]).getTime();
  }
  
  const date = new Date( unix * 1000);
  res.json({"unix": unix, "utc": date.toUTCString()})
}); 




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(process.env.PORT);
  console.log('Your app is listening on port ' + listener.address().port);
});
