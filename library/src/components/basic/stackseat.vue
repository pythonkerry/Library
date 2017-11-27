<template>
  <div class="seats-main">
    <div v-for="item in seats">
      <table>
        <tbody>
          <tr>
            <td>
              <div class="seats-wrap">
                <div class="seat" :class="[item[0].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[0].seatNumber, item[0].seatState)">{{ item[0].seatNumber }}</div>
                <div class="seat right-seat" :class="[item[1].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[1].seatNumber, item[1].seatState)">{{ item[1].seatNumber }}</div>
              </div>
            </td>
            <td>
              <div class="seats-wrap">
                <div class="seat" :class="[item[2].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[2].seatNumber, item[2].seatState)">{{ item[2].seatNumber }}</div>
                <div class="seat right-seat" :class="[item[3].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[3].seatNumber, item[3].seatState)">{{ item[3].seatNumber }}</div></div>
            </td>
            <td>
              <div class="seats-wrap">
                <div class="seat" :class="[item[4].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[4].seatNumber, item[4].seatState)">{{ item[4].seatNumber }}</div>
                <div class="seat right-seat" :class="[item[5].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[5].seatNumber, item[5].seatState)">{{ item[5].seatNumber }}</div>
              </div>
            </td>
            <td>
              <div class="seats-wrap">
                <div class="seat" :class="[item[6].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[6].seatNumber, item[6].seatState)">{{ item[6].seatNumber }}</div>
                <div class="seat right-seat" :class="[item[7].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[7].seatNumber, item[7].seatState)">{{ item[7].seatNumber }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="desk"></td>
            <td class="desk"></td>
            <td class="desk"></td>
            <td class="desk"></td>
          </tr>
          <tr>
            <td>
              <div class="seats-wrap">
                <div class="seat" :class="[item[15].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[15].seatNumber, item[15].seatState)">{{ item[15].seatNumber }}</div>
                <div class="seat right-seat" :class="[item[14].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[14].seatNumber, item[14].seatState)">{{ item[14].seatNumber }}</div>
              </div>
            </td>
            <td>
              <div class="seats-wrap">
                <div class="seat" :class="[item[13].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[13].seatNumber, item[13].seatState)">{{ item[13].seatNumber }}</div>
                <div class="seat right-seat" :class="[item[12].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[12].seatNumber, item[12].seatState)">{{ item[12].seatNumber }}</div>
              </div>
            </td>
            <td>
              <div class="seats-wrap">
                <div class="seat" :class="[item[11].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[11].seatNumber, item[11].seatState)">{{ item[11].seatNumber }}</div>
                <div class="seat right-seat" :class="[item[10].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[10].seatNumber, item[10].seatState)">{{ item[10].seatNumber }}</div>
              </div>
            </td>
            <td>
              <div class="seats-wrap">
                <div class="seat" :class="[item[9].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[9].seatNumber, item[9].seatState)">{{ item[9].seatNumber }}</div>
                <div class="seat right-seat" :class="[item[8].seatState == 1 ? availableClass: takenClass]" @click="onReserve(item[8].seatNumber, item[8].seatState)">{{ item[8].seatNumber }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="hasError"><p>系统出错！</p></div>
  </div>
</template>

<script>
  export default {
    props: {
      stack: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        hasError: false,
        seats: [],
        availableClass: 'seat-available',
        takenClass: 'seat-taken'
      }
    },
    methods: {
      update() {
        // GET http://localhost:3000/seat?stack=xxxxxx
        this.$http.get('/api/seat', {
          params: {
            stack: this.stack
          }
        }).then(response => {
          // 成功
          var data = response.data;
          var seats = [];
          var temp = [];
          for (let i = 0; i < data.length; i++) {
            temp.push(data[i]);
            if (temp.length >= 16) {
              seats.push(temp);
              temp = [];
            }
          }
          this.seats = seats;
        }, response => {
          // 出错
          console.log("error");
          this.seats = [];
          this.hasError = true;
        });
      },
      // 预约
      onReserve(seatNum, seatState) {
        if(seatState == 1) {
          this.$emit('on-reserve', seatNum);
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
  .seats-main {
    width: auto;
  }

  table {
    margin: 15px auto;
    border-collapse: separate;
    border-spacing: 30px 5px;
  }

  td {
    width: 80px;
    height: 36px;
  }

  .seats-wrap {
    width: 100%;
    position: relative;
  }

  .desk {
    background-color: #c8a774;
  }

  .seat {
    display: inline-block;
    width: 36px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-size: 12px;
    color: #fff;
  }

  .seat-available {
    background-image: url(../../assets/seatbg.png);
    background-position: 0 0;
    cursor: pointer;
  }

  .seat-taken {
    background-image: url(../../assets/seatbg.png);
    background-position: 36px 0;
  }

  .right-seat {
    position: absolute;
    right: 0;
  }

</style>
