<template>
  <div>
<!--    预约图书-->
    <div v-if="reserveType === 'book'">
      <div v-if="!afterAction" class="reserve-confirm">
        <p v-if="isOnShelf">预约将锁定该本图书，预约者可在两天（不包括预约当天）之内借阅该书，确认预约？</p>
        <p v-if="!isOnShelf">预约图书后，若该本书在两个星期之内归还，系统将会以邮件或短信方式通知您，确认预约？</p>
        <button @click="onReserve">确认预约</button>
      </div>
      <div v-if="afterAction" class="reserve-result">
        <p v-if="reserveSuccess">预约成功！</p>
        <p v-if="!reserveSuccess">预约失败，请重试！</p>
      </div>
    </div>
<!--    预约座位-->
    <div v-if="reserveType === 'seat'">
      <div v-if="!afterAction" class="reserve-confirm">
        <p>确认预约？</p>
        <button @click="onReserve">确认预约</button>
      </div>
      <div v-if="afterAction" class="reserve-result">
        <p v-if="reserveSuccess">预约成功！</p>
        <p v-if="!reserveSuccess">预约失败，请重试！</p>
      </div>
    </div>
<!--    预约研讨间-->
    <div v-if="reserveType === 'room'">
      <div v-if="!afterAction" class="reserve-confirm">
        <p>{{ roomInfo.room }}<br>{{ roomInfo.time }}</p>
        <table class="room-table">
          <tbody>
            <tr>
              <td class="form-name">预约成员学号：</td>
              <td class="form-value"><input type="text" id="stuNum1" v-model="usernameModelOne" placeholder="请输入学号"></td>
              <td class="form-error">{{ errorTextOne }}</td>
            </tr>
            <tr>
              <td class="form-name">预约成员学号：</td>
              <td class="form-value"><input type="text" id="stuNum2" v-model="usernameModelTwo" placeholder="请输入学号"></td>
              <td class="form-error">{{ errorTextTwo }}</td>
            </tr>
            <tr>
              <td class="form-name">预约成员学号：</td>
              <td class="form-value"><input type="text" id="stuNum3" v-model="usernameModelThree" placeholder="请输入学号"></td>
              <td class="form-error">{{ errorTextThree }}</td>
            </tr>
            <tr>
              <td colspan="2" class="form-fail">{{ errorText }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="onReserve">确认预约</button>
      </div>
      <div v-if="afterAction" class="reserve-result">
        <p v-if="reserveSuccess">预约成功！</p>
        <p v-if="!reserveSuccess">预约失败，请重试！</p>
      </div>
    </div>
<!--    取消预约-->
    <div v-if="cancelType !== ''">
      <div v-if="!afterAction" class="cancel-confirm">
        <p>确认取消？</p>
        <button @click="onCancel">确认</button>
      </div>
      <div v-if="afterAction" class="cancel-result">
        <p v-if="cancelSuccess">取消预约成功！</p>
        <p v-if="!cancelSuccess">取消预约失败，请重试！</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      username: {
        type: String,
        default: ''
      },
      reserveType: {
        type: String,
        default: ''
      },
      cancelType: {
        type: String,
        default: ''
      },
      barcode: {
        type: String,
        default: ''
      },
      isOnShelf: {
        type: Boolean,
        default: true
      },
      seatNum: {
        type: String,
        default: ''
      },
      roomNum: {
        type: String,
        default: ''
      },
      roomName: {
        type: String,
        default: ''
      },
      day: {
        type: String,
        default: ''
      },
      time: {
        type: String,
        default: ''
      },
      stack: {
        type: String,
        default: ''
      },
      reservationDate: {
        type: String,
        default: ''
      },
      useCode: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        afterAction: false,
        reserveSuccess: false,
        cancelSuccess: false,
        usernameModelOne: '',
        usernameModelTwo: '',
        usernameModelThree: '',
        errorText: '',
        errorTextOne: '',
        errorTextTwo: '',
        errorTextThree: ''
      }
    },
    mounted() {
      var stuNum1 = document.getElementById("stuNum1");
      var stuNum2 = document.getElementById("stuNum2");
      var stuNum3 = document.getElementById("stuNum3");
      stuNum1.onblur = this.usernameCheckOne;
      stuNum2.onblur = this.usernameCheckTwo;
      stuNum3.onblur = this.usernameCheckThree;
    },
    // 计算属性
    computed: {
      // 预约房间信息
      roomInfo() {
        var date = new Date();
        if (this.day == 'tomorrow') {
          date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var dateStr = year + '-' + month + '-' + day;
        var timeStr;
        if (this.time == "eight") {
          timeStr = '8:00-10:00';
        } else if (this.time == "ten") {
          timeStr = '10:00-12:00';
        } else if (this.time == "one") {
          timeStr = '13:00-15:00';
        } else if (this.time == "three") {
          timeStr = '15:00-17:00';
        }
        return {
          room: '房间' + this.roomName + ' (' + this.stack + ') ',
          time: dateStr + ' ' + timeStr
        };
      }
    },
    methods: {
      usernameCheckOne() {
        if (!/^\d{11}$/g.test(this.usernameModelOne)) {
          this.errorTextOne = '学号为11位数字';
        } else {
          this.errorTextOne = '';
        }
      },
      usernameCheckTwo() {
        if (!/^\d{11}$/g.test(this.usernameModelTwo)) {
          this.errorTextTwo = '学号为11位数字';
        } else {
          this.errorTextTwo = '';
        }
      },
      usernameCheckThree() {
        if (!/^\d{11}$/g.test(this.usernameModelThree)) {
          this.errorTextThree = '学号为11位数字';
        } else {
          this.errorTextThree = '';
        }
      },
      onReserve() {
        // 预约图书
        if (this.reserveType === 'book') {
          this.$http.post('/api/book/reserve', {
            username: this.username,
            barcode: this.barcode
          }).then((res) => {
            // 预约成功
            if (res.data.success) {
              this.reserveSuccess = true;
            } else {
              this.reserveSuccess = false;
            }
            this.afterAction = true;
            this.$emit('on-refresh');
          }, (error) => {
            this.reserveSuccess = false;
            this.afterAction = true;
            console.log(error);
          });
          // 预约座位
        } else if (this.reserveType === 'seat') {
          this.$http.post('/api/seat/reserve', {
            username: this.username,
            seatNum: this.seatNum
          }).then((res) => {
            // 预约成功
            if (res.data.success) {
              this.reserveSuccess = true;
            } else {
              this.reserveSuccess = false;
            }
            this.afterAction = true;
            this.$emit('on-refresh');
          }, (error) => {
            this.reserveSuccess = false;
            this.afterAction = true;
            console.log(error);
          });
          // 预约房间
        } else if (this.reserveType === 'room') {
          if (this.usernameModelOne == '' || this.usernameModelTwo == '' || this.usernameModelThree == '') {
            this.errorText = '学号不能为空';
          } else {
            if (this.errorTextOne != '' || this.errorTextTwo != '' || this.errorTextThree != '') {
              return;
            }
            this.$http.post('/api/room/reserve', {
              day: this.day,
              time: this.time,
              roomNum: this.roomNum,
              username: this.username,
              stuOne: this.usernameModelOne,
              stuTwo: this.usernameModelTwo,
              stuThree: this.usernameModelThree
            }).then((res) => {
              // 预约成功
              if (res.data.success) {
                this.reserveSuccess = true;
              } else {
                this.reserveSuccess = false;
              }
              this.afterAction = true;
              this.$emit('on-refresh');
            }, (error) => {
              this.reserveSuccess = false;
              this.afterAction = true;
              console.log(error);
            });
          }
        }
      },
      onCancel() {
        // 取消预约图书
        if (this.cancelType === 'book') {
          this.$http.post('/api/reservation/cancelbook', {
            username: this.username,
            barcode: this.barcode
          }).then((res) => {
            // 取消成功
            if (res.data.success) {
              this.cancelSuccess = true;
            } else {
              this.cancelSuccess = false;
            }
            this.afterAction = true;
            // 触发刷新图书
            this.$emit('on-refresh', 'book');
          }, (error) => {
            this.cancelSuccess = false;
            this.afterAction = true;
            console.log(error);
          });
          // 取消预约座位
        } else if (this.cancelType === 'seat') {
          this.$http.post('/api/reservation/cancelseat', {
            username: this.username
          }).then((res) => {
            // 取消成功
            if (res.data.success) {
              this.cancelSuccess = true;
            } else {
              this.cancelSuccess = false;
            }
            this.afterAction = true;
            this.$emit('on-refresh', 'seat');
          }, (error) => {
            this.cancelSuccess = false;
            this.afterAction = true;
            console.log(error);
          });
          // 取消预约房间
        } else if (this.cancelType === 'room') {
          this.$http.post('/api/reservation/cancelroom', {
            roomNumber: this.roomNum,
            reservationDate: this.reservationDate,
            useCode: this.useCode
          }).then((res) => {
            // 取消成功
            if (res.data.success) {
              this.cancelSuccess = true;
            } else {
              this.cancelSuccess = false;
            }
            this.afterAction = true;
            this.$emit('on-refresh', 'room');
          }, (error) => {
            this.cancelSuccess = false;
            this.afterAction = true;
            console.log(error);
          });
        }
      }
    }
  }

</script>

<style scoped>
  .reserve-confirm,
  .reserve-result,
  .cancel-confirm,
  .cancel-result {
    text-align: center;
  }

  button {
    width: 80px;
    height: 40px;
    background: #4fc08d;
    color: #fff;
    border: none;
    cursor: pointer;
    box-shadow: 0 3px 4px 0px rgba(0, 0, 0, .2);
  }

  button:hover {
    box-shadow: 0 3px 5px 2px rgba(0, 0, 0, .2);
  }

  .room-table {}

  .form-name,
  .form-value {
    padding: 10px 0;
  }

  .form-name {
    width: 120px;
  }

  .form-value {
    width: 200px;
  }

  .form-value input {
    width: 200px;
    height: 25px;
    padding-left: 10px;
  }

  .form-error {
    padding-left: 20px;
    color: red;
    font-size: 14px;
  }

  .form-fail {
    padding: 20px 0 0;
    color: red;
    font-size: 14px;
  }

</style>
