<template>
  <div id="details-main">
    <p v-if="bookName !== '' && ISBN">{{ bookName }} <br> {{ 'ISBN: ' + ISBN }}</p>
    <p v-if="bookName === '' || !ISBN"><router-link to="/">返回主页</router-link></p>
    <copy-list :copies="copies" v-if="copies !== []" @on-reserve="reserveCopy"></copy-list>
    <p v-if="copies.length == 0">未找到相关结果！</p>
    <my-dialog :is-show="isShowReserveDialog" @on-close="closeReserveDialog">
      <reserve :reserveType="reserveType" :username="username" :barcode="barcode" :isOnShelf="isOnShelf" @on-refresh="search"></reserve>
    </my-dialog>
  </div>
</template>

<script>
  import CopyList from './basic/copylist'
  import Dialog from './basic/dialog'
  import Reserve from './basic/reserve'
  
  export default {
    name: 'copies',
    components: {
      MyDialog: Dialog,
      CopyList,
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
        ISBN: '',
        bookName: '',
        copies: [],
        isShowReserveDialog: false,
        reserveType: 'book',
        barcode: '',
        isOnShelf: true
      }
    },
    methods: {
      // 搜索
      search() {
        if (this.ISBN != '') {
          // GET http://localhost:3000/book/copy?ISBN=xxxxxxxxxxxxx
          this.$http.get('/api/book/copy', {
            params: {
              ISBN: this.ISBN
            }
          }).then(response => {
            // 成功
            this.copies = [];
            if (response.data.length > 0) {
              response.data.forEach((copy) => {
                this.copies.push(copy);
              });
            }
          }, response => {
            // error callback
            this.copies = [];
            console.log(response);
          });
        } else {
          this.copies = [];
        }
      },
      closeReserveDialog() {
        this.isShowReserveDialog = false;
      },
      setSearchParams() {
        // 接受搜索参数，搜索
        this.ISBN = this.$route.params.ISBN;
        this.bookName = this.$route.params.bookName;
        if (this.ISBN != '') {
          this.search();
        }
      },
      // 预约图书
      reserveCopy(barcode, isOnShelf) {
        this.barcode = barcode;
        this.isOnShelf = isOnShelf;
        // 打开确认登录对话框
        if (this.username != '') {
          this.isShowReserveDialog = true;
        } else {
          this.$emit('on-login');
        }
      }
    },
    created() {
      this.setSearchParams();
    },
    activated() {
      this.setSearchParams();
    }
  }

</script>

<style scoped>
  #details-main {
    padding: 20px 100px;
    min-height: 500px;
  }

  #details-main p {
    text-align: center;
    color: #495a80;
  }

</style>
