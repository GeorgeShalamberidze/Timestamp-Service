// server.js
// where your node app starts

// init project
import express, { static } from 'express';
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
import cors from 'cors';
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/timestamp', (req, res) => {
  let date = new Date()

  return res.json({
    unix: date.getTime(),
    utc: date.toString()
  })
})


// your first API endpoint... 
app.get("/api/timestamp/:date_str", function (req, res) {
  const { date_str } = req.params
  let date = new Date(date_str)

  if (!date_str.toString().match(/[-\s]/g)) {
    date = new Date(parseInt(date_str))
  }

  if (date === null || date.toString() == "Invalid Date") {
    return res.json({ error: "Invalid Date" })
  }
  else {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
