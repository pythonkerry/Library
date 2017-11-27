'use strict';

const express = require('express');
const router = express.Router();
const db = require('../dao/db');

router.get('/', (req, res) => {
  var stack = req.query.stack;
  db.getSeats(stack, (error, seats) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(seats);
  });
});

router.post('/reserve', (req, res) => {
  var username = req.body.username;
  var seatNum = req.body.seatNum;
  db.reserveSeat(username, seatNum, (error, result) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(result);
  });
});





module.exports = router;
