const express = require('express')
const app = express()
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})