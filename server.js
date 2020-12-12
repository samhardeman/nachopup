const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send('Nachopup is Running! Server status: 200');
});

//Listen
const listener = app.listen(process.env.PORT, function() {
  console.log('Listening on ' + listener.address().port);
});