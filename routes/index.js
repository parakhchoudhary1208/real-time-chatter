var express = require('express');
var router = express.Router();
const socket = require('socket.io');

router.get('/', function(req, res) {
  res.render("index");
});

module.exports = router;
