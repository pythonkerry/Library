'use strict';
//调用MySQL模块
const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tiandi123',
  database: 'library',
  multipleStatements: true
});

// 获取图书
const getBooks = (searchCode, content, callback) => {
  var sql, values;
  switch (searchCode) {
    // 所有字段
    case '0':
      sql = 'SELECT * FROM book AS b WHERE CONCAT(b.ISBN, b.bookName, b.writer, b.press, b.classNumber, b.writerNumber, b.yearOfPublish) LIKE ? OR ISBN IN (SELECT ISBN FROM copy WHERE barcode LIKE ?) LIMIT 30';
      break;
      // 题名关键字
    case '1':
      sql = 'SELECT * FROM book WHERE bookName LIKE ? LIMIT 25';
      break;
      // 题名（精确）
    case '2':
      sql = 'SELECT * FROM book WHERE bookName = ? LIMIT 20';
      break;
      // 作者
    case '3':
      sql = 'SELECT * FROM book WHERE writer LIKE ? LIMIT 20';
      break;
      // 出版社
    case '4':
      sql = 'SELECT * FROM book WHERE press LIKE ? LIMIT 50';
      break;
      // ISBN
    case '5':
      sql = 'SELECT * FROM book WHERE ISBN LIKE ? LIMIT 10';
      break;
      // 索书号
    case '6':
      sql = 'SELECT * FROM book AS b WHERE CONCAT(b.classNumber, b.writerNumber) LIKE ? LIMIT 10';
      break;
      // 条形码
    case '7':
      sql = 'SELECT * FROM book WHERE ISBN IN (SELECT ISBN FROM copy WHERE barcode LIKE ?) LIMIT 10';
      break;
  }
  // 采用模糊搜索
  if (searchCode != 2) {
    content = '%' + content + '%';
  }
  // values 填充占位符
  if (searchCode == 0) {
    values = [content, content];
  } else {
    values = [content];
  }

  connection.query(sql, values, (error, books) => {
    if (error) {
      return callback(error);
    }
    return callback(null, books);
  });
}

// 获取单册
const getCopies = (ISBN, callback) => {
  var sql = 'SELECT * FROM copy WHERE ISBN = ?';
  connection.query(sql, [ISBN], (error, copies) => {
    if (error) {
      return callback(error);
    }
    return callback(null, copies);
  });
}

// 登录
const login = (username, password, callback) => {
  var sql = 'SELECT password FROM student WHERE studentNumber = ?';
  connection.query(sql, [username], (error, result) => {
    if (error) {
      return callback(error);
    }
    var success = false;
    if (result && result[0]) {
      if (result[0].password === password) {
        success = true;
      }
    }
    return callback(null, {
      success
    });
  });
};

// 预约图书
const reserveBook = (username, barcode, callback) => {
  var sql = 'UPDATE copy SET reservationDate = CURDATE(), reserveStuNum = ? WHERE barcode = ? AND reservationDate IS NULL AND reserveStuNum IS NULL';
  connection.query(sql, [username, barcode], (error, result) => {
    if (error) {
      return callback(error);
    }
    var success = false;
    if (result.affectedRows == 1) {
      success = true;
    }
    return callback(null, {
      success
    });
  })
};

// 获取座位信息
const getSeats = (stack, callback) => {
  var sql = 'SELECT seatNumber, seatState, seatRow, seatColumn FROM seat WHERE seatStack = ? ORDER BY seatNumber';
  connection.query(sql, [stack], (error, seats) => {
    if (error) {
      return callback(error);
    }
    return callback(null, seats);
  });
};

// 预约座位
const reserveSeat = (username, seatNum, callback) => {
  // 如果已有座位，则修改其状态，然后更新学生座位信息和对应座位的状态
  var sql = 'UPDATE student st, seat se SET se.seatState = "1" WHERE st.studentNumber = ? AND se.seatNumber = st.seatNumber; UPDATE student st, seat se SET st.seatNumber = ?, se.seatState = "0" WHERE st.studentNumber = ? AND se.seatNumber = ? AND se.seatState = "1"';
  connection.query(sql, [username, seatNum, username, seatNum], (error, results) => {
    if (error) {
      return callback(error);
    }
    var success = false;
    if (results[1].affectedRows == 2) {
      success = true;
    }
    return callback(null, {
      success
    });
  })
};

// 获取研讨间信息
const getRooms = (day, callback) => {
  var sql;
  if (day === 'today') {
    sql = 'SELECT roomNumber, roomName, stack, stateOne, stateTwo, stateThree, stateFour FROM room ORDER BY roomNumber';
  } else {
    sql = 'SELECT roomNumber, roomName, stack, stateFive, stateSix, stateSeven, stateEight FROM room ORDER BY roomNumber';
  }
  connection.query(sql, (error, rooms) => {
    if (error) {
      return callback(error);
    }
    return callback(null, rooms);
  });
};

// 预约研讨间
const reserveRoom = (day, time, roomNum, username, stuOne, stuTwo, stuThree, callback) => {
  var update, useCode, insert, sql;
  // 预约今天
  if (day === 'today') {
    // 8:00-10:00
    if (time === 'eight') {
      useCode = 1;
      update = 'UPDATE room SET stateOne = "0" WHERE roomNumber = ? AND stateOne = "1"';
      // 10:00-12:00
    } else if (time === 'ten') {
      useCode = 2;
      update = 'UPDATE room SET stateTwo = "0" WHERE roomNumber = ? AND stateTwo = "1"';
      // 13:00-15:00
    } else if (time === 'one') {
      useCode = 3;
      update = 'UPDATE room SET stateThree = "0" WHERE roomNumber = ? AND stateThree = "1"';
      // 15:00-17:00
    } else {
      useCode = 4;
      update = 'UPDATE room SET stateFour = "0" WHERE roomNumber = ? AND stateFour = "1"';
    }
    insert = 'INSERT INTO roomreservation(roomNumber, reservationDate, useCode, studentNumber) VALUES(?, CURDATE(), ?, ?); INSERT INTO roomuser(roomNumber, reservationDate, useCode, studentNumber) VALUES(?, CURDATE(), ?, ?), (?, CURDATE(), ?, ?), (?, CURDATE(), ?, ?)';
    // 预约明天
  } else {
    if (time === 'eight') {
      useCode = 1;
      update = 'UPDATE room SET stateFive = "0" WHERE roomNumber = ? AND stateFive = "1"';
    } else if (time === 'ten') {
      useCode = 2;
      update = 'UPDATE room SET stateSix = "0" WHERE roomNumber = ? AND stateSix = "1"';
    } else if (time === 'one') {
      useCode = 3;
      update = 'UPDATE room SET stateSeven = "0" WHERE roomNumber = ? AND stateSeven = "1"';
    } else {
      useCode = 4;
      update = 'UPDATE room SET stateEight = "0" WHERE roomNumber = ? AND stateEight = "1"';
    }
    insert = 'INSERT INTO roomreservation(roomNumber, reservationDate, useCode, studentNumber) VALUES(?, CURDATE() + INTERVAL 1 DAY, ?, ?); INSERT INTO roomuser(roomNumber, reservationDate, useCode, studentNumber) VALUES(?, CURDATE() + INTERVAL 1 DAY, ?, ?), (?, CURDATE() + INTERVAL 1 DAY, ?, ?), (?, CURDATE() + INTERVAL 1 DAY, ?, ?)';
  }
  sql = update + '; ' + insert;

  // 事务
  connection.getConnection((error, conn) => {
    if (error) {
      return callback(error);
    }
    conn.beginTransaction(error => {
      if (error) {
        return callback(error);
      }

      conn.query(sql, [roomNum, roomNum, useCode, username, roomNum, useCode, stuOne, roomNum, useCode, stuTwo, roomNum, useCode, stuThree], (error, results) => {
        if (error) {
          return conn.rollback(() => {
            callback(error);
          });
        }
        var success = false;
        if (results[0].affectedRows == 1 && results[1].affectedRows == 1 && results[2].affectedRows == 3) {
          conn.commit(error => {
            if (error) {
              return conn.rollback(() => {
                callback(error);
              });
            }
          });
          success = true;
        } else {
          return conn.rollback(() => {
            callback(null, {
              success
            });
          });
        }
        conn.release();
        return callback(null, {
          success
        });
      });
    });
  });
};

// 获取图书预约信息
const getBookReservation = (username, callback) => {
  var sql = 'SELECT b.bookName, c.ISBN, c.barcode, c.stack, c.shelf, c.side, c.column, c.layer, c.copyState FROM book b, copy c WHERE c.reserveStuNum = ? AND c.ISBN = b.ISBN';
  connection.query(sql, [username], (error, copies) => {
    if (error) {
      return callback(error);
    }
    return callback(null, copies);
  });
}

// 获取座位预约信息
const getSeatReservation = (username, callback) => {
  var sql = 'SELECT st.seatNumber, se.seatStack FROM student st, seat se WHERE st.seatNumber = se.seatNumber AND st.studentNumber = ?';
  connection.query(sql, [username], (error, seat) => {
    if (error) {
      return callback(error);
    }
    return callback(null, seat);
  });
}

// 获取研讨间预约信息
const getRoomReservation = (username, callback) => {
  var sql = 'SELECT re.roomNumber, re.reservationDate, re.useCode, r.roomName, r.stack FROM roomreservation re, room r WHERE re.studentNumber = ? AND re.roomNumber = r.roomNumber AND (DATEDIFF(CURDATE(), re.reservationDate) = 0 OR DATEDIFF(CURDATE(), re.reservationDate) = -1)';
  connection.query(sql, [username], (error, rooms) => {
    if (error) {
      return callback(error);
    }
    return callback(null, rooms);
  });
}

// 取消图书预约
const cancelBookReservation = (username, barcode, callback) => {
  var sql = 'UPDATE student s, copy c SET c.reservationDate = NULL, c.reserveStuNum = NULL WHERE s.studentNumber = ? AND s.studentNumber = c.reserveStuNum AND c.barcode = ?';
  connection.query(sql, [username, barcode], (error, result) => {
    if (error) {
      return callback(error);
    }
    var success = false;
    if (result.affectedRows == 1) {
      success = true;
    }
    return callback(null, {
      success
    });
  });
}

// 取消座位预约
const cancelSeatReservation = (username, callback) => {
  var sql = 'UPDATE student st, seat se SET st.seatNumber = NULL, se.seatState = 1 WHERE st.studentNumber = ? AND st.seatNumber = se.seatNumber AND se.seatState = 0';
  connection.query(sql, [username], (error, result) => {
    if (error) {
      return callback(error);
    }
    var success = false;
    if (result.affectedRows == 2) {
      success = true;
    }
    return callback(null, {
      success
    });
  });
}

// 取消研讨间预约
const cancelRoomReservation = (roomNumber, reservationDate, useCode, callback) => {
  var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = nowDate.getMonth + 1;
  var day = nowDate.getDate;
  var nowDate = new Date(year, month, day);
  var resDateArr = reservationDate.split('-');
  var resDate = new Date(resDateArr[0], resDateArr[1], resDateArr[2]);
  var dayValue;
  var sql;
  var deleteSql = 'DELETE FROM roomreservation WHERE roomNumber = ? AND reservationDate = ? AND useCode = ?; DELETE FROM roomuser WHERE roomNumber = ? AND reservationDate = ? AND useCode = ?'
  // 明天
  if(resDate > nowDate) {
    var state;
    if(useCode == 1) {
      state = 'stateFive';
    }else if(useCode == 2) {
      state = 'stateSix';
    }else if(useCode == 3) {
      state = 'stateSeven';
    }else {
      state = 'stateEight';
    }
    sql = deleteSql + '; ' + 'UPDATE room SET ' + state + ' = 1 WHERE roomNumber = ?';
  // 今天
  }else {
    var state;
    if(useCode == 1) {
      state = 'stateOne';
    }else if(useCode == 2) {
      state = 'stateTwo';
    }else if(useCode == 3) {
      state = 'stateThree';
    }else {
      state = 'stateFour';
    }
    sql = deleteSql + '; ' + 'UPDATE room SET ' + state + ' = 1 WHERE roomNumber = ?';
  }
  
  connection.query(sql, [roomNumber, reservationDate, useCode, roomNumber, reservationDate, useCode, roomNumber], (error, result) => {
    if (error) {
      return callback(error);
    }
    var success = false;
    if (result[0].affectedRows == 1 && result[1].affectedRows == 3 && result[2].affectedRows == 1) {
      success = true;
    }
    return callback(null, {
      success
    });
  });
}



module.exports = {
  getBooks,
  getCopies,
  login,
  reserveBook,
  getSeats,
  reserveSeat,
  getRooms,
  reserveRoom,
  getBookReservation,
  getSeatReservation,
  getRoomReservation,
  cancelBookReservation,
  cancelSeatReservation,
  cancelRoomReservation
};
