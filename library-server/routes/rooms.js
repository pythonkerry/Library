'use strict';

const express = require('express');
const router = express.Router();
const db = require('../dao/db');

router.get('/', (req, res) => {
  var day = req.query.day;
  db.getRooms(day, (error, seats) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(seats);
  });
});

router.post('/reserve', (req, res) => {
  var day = req.body.day;
  var time = req.body.time;
  var roomNum = req.body.roomNum;
  var username = req.body.username;
  var stuOne = req.body.stuOne;
  var stuTwo = req.body.stuTwo;
  var stuThree = req.body.stuThree;
  db.reserveRoom(day, time, roomNum, username, stuOne, stuTwo, stuThree, (error, result) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(result);
  });
});





module.exports = router;
