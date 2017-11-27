<template>
  <div class="room-res-main">
    <h3>我的研讨间</h3>
    <table class="info-names" v-if="rooms.length != 0">
      <tbody>
        <tr>
          <td><div class="info-value-short">研讨间</div></td>
          <td><div class="info-value">书库</div></td>
          <td><div class="info-value">时间</div></td> 
          <td><div class="info-value-short">取消预约？</div></td> 
        </tr>
      </tbody>
    </table>
    <div class="room-item" v-for="item in rooms">
      <table>
        <tbody>
          <tr>
            <td><div class="info-value-short">{{ item.roomName }}</div></td>
            <td><div class="info-value">{{ item.stack }}</div></td>
            <td><div class="info-value">{{ item.reservationDate + ' ' + timeMap[item.useCode] }}</div></td>
            <td><div class="info-value-short"><button @click="onCancel(item.roomNumber, item.reservationDate, item.useCode)">取消</button></div></td> 
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="hasError" class="tips"><p>系统出错！</p></div>
    <div v-if="rooms.length == 0" class="tips"><p>暂无预约研讨间！</p></div>
  </div>
</template>

<script>
  export default {
    props: {
      username: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        hasError: false,
        rooms: [],
        timeMap: {
          '0': '',
          '1': '8:00-10:00',
          '2': '10:00-12:00',
          '3': '13:00-15:00',
          '4': '15:00-17:00'
        }
      }
    },
    methods: {
      update() {
        // GET http://localhost:3000/reservation/room?username=xxxxxxxxxxx
        this.$http.get('/api/reservation/room', {
          params: {
            username: this.username
          }
        }).then(response => {
          // 成功
          this.rooms = response.data;
        }, response => {
          // 出错
          console.log("error");
          this.rooms = [];
          this.hasError = true;
        });
      },
      // 取消预约
      onCancel(roomNumber, reservationDate, useCode) {
        if (this.username != '') {
          this.$emit('on-cancel', roomNumber, reservationDate, useCode);
        }
      }
    },
    mounted() {
      this.update();
    },
    activated() {
      this.update();
    }
  }

</script>

<style scoped>
  .room-res-main {
    margin-bottom: 30px;
  }
  
  table {
    text-align: center;
  }

  .room-item {
    width: 820px;
    margin: auto;
    color: #495a80;
    padding: 10px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 4px 0 rgba(0, 0, 0, .16);
    margin-bottom: 15px;
  }

  .room-item:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 5px 3px rgba(0, 0, 0, .16);
  }
  
  h3, .tips {
    color: #495a80;
    width: 820px;
    margin: auto;
  }
  
  .tips p {
    text-align: center;
  }

  .info-names {
    width: 820px;
    margin: auto;
    margin-top: 10px;
    font-size: 14px;
  }

  .info-value {
    width: 319px;
  }

  .info-value-short {
    width: 80px;
  }

  button {
    width: 50px;
    height: 25px;
    cursor: pointer;
    border: none;
    color: #495a80;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 2px 0 rgba(0, 0, 0, .16);
  }

  button:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 3px 2px rgba(0, 0, 0, .16);
  }

</style>
