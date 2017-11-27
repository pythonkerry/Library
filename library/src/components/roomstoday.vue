<template>
  <div>
    <rooms :day="day" @on-reserve="onReserve" ref="child2"></rooms>
  </div>
</template>

<script>
  import Rooms from './basic/rooms'

  export default {
    components: {
      Rooms
    },
    data() {
      return {
        day: 'today'
      }
    },
    methods: {
      onReserve(roomNum, roomName, day, time, stack) {
        this.$emit('on-reserve', roomNum, roomName, day, time, stack);
      }
    }
  }

</script>

<style scoped>
  
</style>
