<template>
  <div>
    <stack-seat :stack="stack" @on-reserve="onReserve" ref="child2"></stack-seat>
  </div>
</template>

<script>
  import StackSeat from './basic/stackseat'

  export default {
    components: {
      StackSeat
    },
    data() {
      return {
        stack: '二楼北：工程与信息技术书库'
      }
    },
    methods: {
      onReserve(seatNum) {
        this.$emit('on-reserve', seatNum);
      }
    }
  }

</script>

<style scoped>
  
</style>
