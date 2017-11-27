<template>
  <div class="book-res-main">
    <h3>我的图书</h3>
    <table class="info-names" v-if="books.length != 0">
      <tbody>
        <tr>
          <td><div class="info-value">书名</div></td>
          <td><div class="info-value">ISBN</div></td>
          <td><div class="info-value">条形码</div></td>
          <td><div class="info-value-shorter">状态</div></td> 
          <td><div class="info-value">位置</div></td> 
          <td><div class="info-value-short">取消预约？</div></td> 
        </tr>
      </tbody>
    </table>
    <div class="book-item" v-for="item in books">
      <table>
        <tbody>
          <tr>
            <td><div class="info-value">{{ item.bookName }}</div></td>
            <td><div class="info-value">{{ item.ISBN }}</div></td>
            <td><div class="info-value">{{ item.barcode }}</div></td>
            <td><div class="info-value-shorter">{{ item.copyState }}</div></td> 
            <td><div class="info-value">{{ item.location }}</div></td> 
            <td><div class="info-value-short"><button @click="onCancel(item.barcode)">取消</button></div></td> 
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="hasError" class="tips"><p>系统出错！</p></div>
    <div v-if="books.length == 0" class="tips"><p>暂无预约图书！</p></div>
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
        books: []
      }
    },
    methods: {
      update() {
        // GET http://localhost:3000/reservation/book?username=xxxxxxxxxxx
        this.$http.get('/api/reservation/book', {
          params: {
            username: this.username
          }
        }).then(response => {
          // 成功
          this.books = response.data;
        }, response => {
          // 出错
          console.log("error");
          this.books = [];
          this.hasError = true;
        });
      },
      // 取消预约
      onCancel(barcode) {
        if (this.username != '') {
          this.$emit('on-cancel', barcode);
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
  .book-res-main {
    margin-bottom: 30px;
  }
  
  table {
    text-align: center;
  }
  
  .book-item {
    width: 820px;
    margin: auto;
    color: #495a80;
    padding: 10px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 4px 0 rgba(0, 0, 0, .16);
    margin-bottom: 15px;
  }

  .book-item:hover {
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
    width: 160px;
  }
  
  .info-value-short {
    width: 80px;
  }
  
  .info-value-shorter {
    width: 70px;
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
