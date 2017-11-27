<template>
  <div class="seat-res-main">
    <h3>我的座位</h3>
    <table class="info-names" v-if="seat.length != 0">
      <tbody>
        <tr>
          <td><div class="info-value-short">座位</div></td>
          <td><div class="info-value">位置</div></td>
          <td><div class="info-value-short">取消预约？</div></td> 
        </tr>
      </tbody>
    </table>
    <div class="seat-item" v-if="seat.length == 1">
      <table>
        <tbody>
          <tr>
            <td><div class="info-value-short">{{ seat[0].seatNumber }}</div></td>
            <td><div class="info-value">{{ seat[0].seatStack }}</div></td>
            <td><div class="info-value-short"><button @click="onCancel">取消</button></div></td> 
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="hasError" class="tips"><p>系统出错！</p></div>
    <div v-if="seat.length == 0" class="tips"><p>暂无预约座位！</p></div>
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
        seat: []
      }
    },
    methods: {
      update() {
        // GET http://localhost:3000/reservation/seat?username=xxxxxxxxxxx
        this.$http.get('/api/reservation/seat', {
          params: {
            username: this.username
          }
        }).then(response => {
          // 成功
          this.seat = response.data;
        }, response => {
          // 出错
          console.log("error");
          this.seat = [];
          this.hasError = true;
        });
      },
      // 取消预约
      onCancel() {
        if (this.username != '') {
          this.$emit('on-cancel');
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
  .seat-res-main {
    margin-bottom: 30px;
  }

  table {
    text-align: center;
  }

  .seat-item {
    width: 820px;
    margin: auto;
    color: #495a80;
    padding: 10px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 4px 0 rgba(0, 0, 0, .16);
    margin-bottom: 15px;
  }

  .seat-item:hover {
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
    width: 642px;
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
