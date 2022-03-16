// server.js
// where your node app starts

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


app.route("/api/:date?")
    .get((req, res) => {
      var dateStr = req.params.date;
      var date;
      if (!dateStr) {
        date = new Date();
      } else {
        date = new Date(!isNaN(dateStr) ? parseInt(dateStr) : Date.parse(dateStr));
      }
      
      if (!(date instanceof Date && !isNaN(date))) {
        res.json({
          error: "Invalid Date"
        });
        return;
      }

      var dateUnix = date.getTime();
      var utcStr = date.toUTCString();
      res.json({
        unix: dateUnix,
        utc: utcStr
      });
    });


// listen for requests :)
var listener = app.listen(1108, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
