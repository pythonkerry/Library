<template>
  <div>
    <div class="copy-item" v-for="item in copies">
      <table>
        <tbody>
          <tr>
            <td><div class="info-name">单册状态：</div></td>
            <td><div class="info-value">{{ item.copyState }}</div></td>
            <td><div class="info-name">应还日期：</div></td>
            <td><div class="info-value">{{ item.dueDate }}</div></td>        
          </tr>
          <tr>
            <td><div class="info-name">条形码：</div></td>
            <td><div class="info-value">{{ item.barcode }}</div></td> 
            <td v-if="item.reserveStuNum == null" colspan="2" class="reserve"><span @click="onReserve(item.barcode, item.dueDate)">预约</span></td>
          </tr>
          <tr>
            <td><div class="info-name">位置：</div></td>
            <td colspan="2"><div>{{ item.location }}</div></td>  
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      copies: {
        type: Array,
        default: [{
          copyState: '',
          dueDate: '',
          barcode: '',
          location: '',
          reservationDate: '',
          reserveStuNum: ''
        }]
      }
    },
    methods: {
      // 预约
      onReserve(barcode, dueDate) {
        var isOnShelf = dueDate? false: true;
        this.$emit('on-reserve', barcode, isOnShelf);
      }
    }
  }

</script>

<style scoped>
  
  .copy-item {
    color: #495a80;
    padding: 20px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 4px 0 rgba(0, 0, 0, .16);
    margin-bottom: 20px;
  }

  .copy-item:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 5px 3px rgba(0, 0, 0, .16);
  }

  .info-name {
    width: 100px;
  }

  .info-value {
    width: 220px;
  }
  
  .reserve {
    width: 100%;
    padding-right: 20px;
    text-align: right;
  }
  
  .reserve span {
    cursor: pointer;
  }
  
  .reserve span:hover {
    color: #011935;
  }

</style>
