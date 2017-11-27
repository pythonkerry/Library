'use strict';

const express = require('express');
const router = express.Router();
const db = require('../dao/db');

// 登录
router.post('/', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  db.login(username, password, (error, result) => {
    if (error) {
      return res.json({
        error: error
      });
    }
    return res.json(result);
  });
});

module.exports = router;
