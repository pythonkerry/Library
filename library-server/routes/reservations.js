'use strict';

const express = require('express');
const router = express.Router();
const db = require('../dao/db');
const moment = require('moment');

router.get('/book', (req, res) => {
  var username = req.query.username;
  db.getBookReservation(username, (error, copies) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    copies.forEach(copy => {
      // location, 如：三楼北：语言文史书库 13架B面2列6层
      copy.location = copy.stack + ' ' + copy.shelf + '架' + copy.side + '面' + copy.column + '列' + copy.layer + '层';
      delete copy.stack;
      delete copy.shelf;
      delete copy.side;
      delete copy.column;
      delete copy.layer;
    });
    return res.json(copies);
  });
});


router.get('/seat', (req, res) => {
  var username = req.query.username;
  db.getSeatReservation(username, (error, seat) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(seat);
  });
});

router.get('/room', (req, res) => {
  var username = req.query.username;
  db.getRoomReservation(username, (error, rooms) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    rooms.forEach(room => {
      if (room.reservationDate) {
        room.reservationDate = moment(room.reservationDate).format('YYYY-MM-DD');
      }
    });
    return res.json(rooms);
  });
});

router.post('/cancelbook', (req, res) => {
  var username = req.body.username;
  var barcode = req.body.barcode;
  db.cancelBookReservation(username, barcode, (error, result) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(result);
  });
});

router.post('/cancelseat', (req, res) => {
  var username = req.body.username;
  db.cancelSeatReservation(username, (error, result) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(result);
  });
});

router.post('/cancelroom', (req, res) => {
  var roomNumber = req.body.roomNumber;
  var reservationDate = req.body.reservationDate;
  var useCode = req.body.useCode;
  db.cancelRoomReservation(roomNumber, reservationDate, useCode, (error, result) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(result);
  });
});





module.exports = router;
