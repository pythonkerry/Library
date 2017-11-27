'use strict';

const express = require('express');
const router = express.Router();
const db = require('../dao/db');
const moment = require('moment');

// 获取图书信息
router.get('/', (req, res) => {
  var searchCode = req.query.searchCode;
  var content = req.query.content;
  db.getBooks(searchCode, content, (error, books) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(books);
  });
});

// 获取单册信息
router.get('/copy', (req, res) => {
  var ISBN = req.query.ISBN;
  db.getCopies(ISBN, (error, copies) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    copies.forEach(copy => {
      delete copy.ISBN;
      // location, 如：三楼北：语言文史书库 13架B面2列6层
      copy.location = copy.stack + ' ' + copy.shelf + '架' + copy.side + '面' + copy.column + '列' + copy.layer + '层';
      if (copy.dueDate) {
        copy.dueDate = moment(copy.dueDate).format('YYYY-MM-DD');
      }
      if (copy.reservationDate) {
        copy.reservationDate = moment(copy.reservationDate).format('YYYY-MM-DD');
      }
      delete copy.stack;
      delete copy.shelf;
      delete copy.side;
      delete copy.column;
      delete copy.layer;
      delete copy.borrowDate;
      delete copy.returnDate;
    });
    return res.json(copies);
  });
});

// 预约图书
router.post('/reserve', (req, res) => {
  var username = req.body.username;
  var barcode = req.body.barcode;
  db.reserveBook(username, barcode, (error, result) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(result);
  });
});





module.exports = router;
