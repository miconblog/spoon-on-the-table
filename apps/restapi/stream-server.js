const express = require('express');
const server = express();

server.get('/', function (req, res) {
  res.send('OK');
});

module.exports = server;
