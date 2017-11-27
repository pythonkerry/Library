<template>
  <div class="rooms-main">
<!--    今天的房间信息-->
    <div v-if="day == 'today'">
      <div v-for="item in rooms">
        <table>
          <tbody>
            <tr>
              <td>{{ item.roomName }}</td>
              <td class="room-state" :class="[item.stateOne == 1 ? availableClass: takenClass]" @click="onReserve(item.roomNumber, item.roomName, item.stateOne, 'eight', item.stack)"></td>
              <td class="room-state" :class="[item.stateTwo == 1 ? availableClass: takenClass]" @click="onReserve(item.roomNumber, item.roomName, item.stateTwo, 'ten', item.stack)"></td>
              <td class="room-state" :class="[item.stateThree == 1 ? availableClass: takenClass]" @click="onReserve(item.roomNumber, item.roomName, item.stateThree, 'one', item.stack)"></td>
              <td class="room-state" :class="[item.stateFour == 1 ? availableClass: takenClass]" @click="onReserve(item.roomNumber, item.roomName, item.stateFour, 'three', item.stack)"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<!--    明天的房间信息-->
    <div v-if="day == 'tomorrow'">
      <div v-for="item in rooms">
        <table>
          <tbody>
            <tr>
              <td>{{ item.roomName }}</td>
              <td class="room-state" :class="[item.stateFive == 1 ? availableClass: takenClass]" @click="onReserve(item.roomNumber, item.roomName, item.stateFive, 'eight', item.stack)"></td>
              <td class="room-state" :class="[item.stateSix == 1 ? availableClass: takenClass]" @click="onReserve(item.roomNumber, item.roomName, item.stateSix, 'ten', item.stack)"></td>
              <td class="room-state" :class="[item.stateSeven == 1 ? availableClass: takenClass]" @click="onReserve(item.roomNumber, item.roomName, item.stateSeven, 'one', item.stack)"></td>
              <td class="room-state" :class="[item.stateEight == 1 ? availableClass: takenClass]" @click="onReserve(item.roomNumber, item.roomName, item.stateEight, 'three', item.stack)"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="hasError"><p>系统出错！</p></div>
  </div>
</template>

<script>
  export default {
    props: {
      day: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        hasError: false,
        rooms: [],
        availableClass: 'room-available',
        takenClass: 'room-taken'
      }
    },
    methods: {
      update() {
        // GET http://localhost:3000/room?day=xxx
        this.$http.get('/api/room', {
          params: {
            day: this.day
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
      // 预约
      onReserve(roomNum, roomName, state, time, stack) {
        if(state == 1) {
          if(this.day == 'today') {
            var nowTime = new Date();
            var nowHour = nowTime.getHours();
            // 判断当前时间和研讨间时间关系
            if(time == 'eight') {
              if(nowHour >= 8) {
                return;
              }
            }else if(time == 'ten') {
              if(nowHour >= 10) {
                return;
              }
            }else if(time == 'one') {
              if(nowHour >= 13) {
                return;
              }
            }else {
              if(nowHour >= 15) {
                return;
              }
            }
          }
          this.$emit('on-reserve', roomNum, roomName, this.day, time, stack);
        }
      }
    },
    created() {
      this.update();
    },
    activated() {
      this.update();
    }
  }

</script>

<style scoped>
  .rooms-main {
    width: auto;
  }

  table {
    margin: 10px auto;
    border-collapse: separate;
    border-spacing: 60px 5px;
    color: #495a80;
  }

  .room-state {
    width:38px;
    height: 40px;
  }

  .room-available {
    background-image: url(../../assets/roombg.png);
    background-position: 0 0;
    cursor: pointer;
  }

  .room-taken {
    background-image: url(../../assets/roombg.png);
    background-position: 40px 0;
  }

</style>
