<template>
  <div class="info-main">
    <seat-res-list :username="username" @on-cancel="cancelSeat" ref="childseat"></seat-res-list>
    <book-res-list :username="username" @on-cancel="cancelBook" ref="childbook"></book-res-list>
    <room-res-list :username="username" @on-cancel="cancelRoom" ref="childroom"></room-res-list>
    <my-dialog :is-show="isShowCancelDialog" @on-close="closeCancelDialog">
      <reserve :cancelType="cancelType" :username="username" :barcode="barcodeToCancel" :reservationDate="resDateToCancel" :roomNum="roomNumberToCancel" :useCode="useCodeToCancel" @on-refresh="onRefresh"></reserve>
    </my-dialog>
  </div>
</template>

<script>
  import BookResList from './basic/bookreslist'
  import RoomResList from './basic/roomreslist'
  import SeatResList from './basic/seatres'
  import Dialog from './basic/dialog'
  import Reserve from './basic/reserve'
  
  export default {
    components: {
      BookResList,
      RoomResList,
      SeatResList,
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
        cancelType: '',
        isShowCancelDialog: false,
        barcodeToCancel: '',
        roomNumberToCancel: '',
        resDateToCancel: '',
        useCodeToCancel: ''
      }
    },
    methods: {
      // 取消座位预约
      cancelSeat() {
        this.cancelType = 'seat';
        this.isShowCancelDialog = true;
      },
      // 取消图书预约
      cancelBook(barcode) {
        this.cancelType = 'book';
        this.barcodeToCancel = barcode;
        this.isShowCancelDialog = true;
      },
      // 取消研讨间预约
      cancelRoom(roomNumber, reservationDate, useCode) {
        this.cancelType = 'room';
        this.roomNumberToCancel = roomNumber;
        this.resDateToCancel = reservationDate;
        this.useCodeToCancel = useCode;
        this.isShowCancelDialog = true;
      },
      // 关闭对话框
      closeCancelDialog() {
        this.isShowCancelDialog = false;
      },
      // 更新
      onRefresh(type) {
        if(type == 'book') {
          this.$refs.childbook.update();
        }else if(type == 'seat') {
          this.$refs.childseat.update();
        }else if(type == 'room') {
          this.$refs.childroom.update();
        }
      }
    }
  }

</script>

<style scoped>
  .info-main {
    padding: 50px;
  }
</style>