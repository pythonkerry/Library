<template>
  <div class="rooms-main">
    <div class="rooms-wrap">
      <div class="rooms-left">
        <ul>
          <router-link v-for="item in days" :key="item.name" :to="{ path: item.path }" tag="li" active-class="active">
            {{ item.name }}
          </router-link>
        </ul>

      </div>
      <div class="rooms-right">
        <table>
          <tbody>
            <tr>
              <td>研讨间</td>
              <td>8:00-10:00</td>
              <td>10:00-12:00</td>
              <td>13:00-15:00</td>
              <td>15:00-17:00</td>
            </tr>
          </tbody>
        </table>
        <keep-alive>
          <router-view @on-reserve="onReserve" ref="child1"></router-view>
        </keep-alive>
      </div>
    </div>
    <my-dialog :is-show="isShowReserveDialog" @on-close="closeReserveDialog">
      <reserve :reserveType="reserveType" :username="username" :roomNum="roomNum" :roomName="roomName" :day="day" :time="time" :stack="stack" @on-refresh="onRefresh"></reserve>
    </my-dialog>
  </div>
</template>

<script>
  import Dialog from './basic/dialog'
  import Reserve from './basic/reserve'

  export default {
    components: {
      MyDialog: Dialog,
      Reserve
    },
    props: {
      username: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        reserveType: 'room',
        day: '',
        time: '',
        roomNum: '',
        roomName: '',
        stack: '',
        isShowReserveDialog: false,
        days: [{
            name: '今天',
            path: 'today'
          },
          {
            name: '明天',
            path: 'tomorrow'
          }
        ]
      }
    },
    methods: {
      closeReserveDialog() {
        this.isShowReserveDialog = false;
      },
      onReserve(roomNum, roomName, day, time, stack) {
        if (this.username != '') {
          this.roomNum = roomNum;
          this.roomName = roomName;
          this.day = day;
          this.time = time;
          this.stack = stack;
          this.isShowReserveDialog = true;
        } else {
          this.$emit('on-login');
        }
      },
      onRefresh() {
        this.$refs.child1.$refs.child2.update();
      }
    }
  }

</script>

<style scoped>
  .rooms-main {
    padding: 50px 0;
    min-height: 400px;
  }

  .rooms-wrap {
    width: 800px;
    min-height: 450px;
    margin: auto;
    overflow: auto;
  }

  .rooms-left {
    float: left;
    margin-left: 2px;
    width: 210px;
    min-height: 420px;
    border: 1px solid #e3e3e3;
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .16);
  }

  .rooms-left ul {
    padding: 10px;
  }

  .rooms-left li {
    list-style: none;
    padding: 5px 0;
    cursor: pointer;
    text-align: center;
    color: #495a80;
  }

  .rooms-left li.active,
  .rooms-left li:hover {
    background: #52c3dd;
    color: #fff;
  }

  .rooms-right {
    float: right;
    margin-right: 2px;
    margin-bottom: 2px;
    min-width: 550px;
    min-height: 420px;
    padding-top: 15px;
    border: 1px solid #e3e3e3;
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .16);
  }

  .rooms-right table {
    margin: auto;
    text-align: center;
    border-collapse: separate;
    border-spacing: 18px 0;
    color: #495a80;
  }

  .rooms-right td {
    width: 80px;
    font-size: 14px;
  }

</style>
