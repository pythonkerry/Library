<template>
  <div class="main">
    <div class="search-control">
        <v-selection v-if="synFlag" :selections="searchWays" :selected="searchWay" @on-change="changeWay"></v-selection>
      <div class="input-box"><input type="text" v-model="searchContent" title="输入搜索词" @keyup.enter="search"></div>
        <button type="submit" title="搜索" @click="search"></button>
    </div>
    <div class="book-content">
      <book-list :books="books" v-if="books.length > 0"></book-list>
      <p v-if="books.length == 0">未找到相关结果！</p>
    </div>
  </div>
</template>

<script>
  import VSelection from './basic/selection'
  import BookList from './basic/booklist'

  export default {
    components: {
      VSelection,
      BookList
    },
    data() {
      return {
        searchContent: '',
        searchWay: 0,
        books: [],
        synFlag: true,
        searchWays: [{
            label: '所有字段',
            value: 0
          },
          {
            label: '题名关键词',
            value: 1
          },
          {
            label: '题名(精确)',
            value: 2
          },
          {
            label: '作者',
            value: 3
          },
          {
            label: '出版社',
            value: 4
          },
          {
            label: 'ISBN',
            value: 5
          },
          {
            label: '索书号',
            value: 6
          },
          {
            label: '条形码',
            value: 7
          }
        ]
      }
    },
    methods: {
      changeWay(wayIndex) {
        this.searchWay = wayIndex;
      },
      // 搜索
      search() {
        if (this.searchContent != '') {
          // GET http://localhost:3000/book?searchCode=x&content=xxx
          this.$http.get('/api/book', {
            params: {
              searchCode: this.searchWay,
              content: this.searchContent
            }
          }).then(response => {
            // 成功
            //console.log(response.data);
            this.books = [];
            if (response.data.length > 0) {
              response.data.forEach((book) => {
                var b = new Buffer(book.bookCover);
                book.bookCover = b.toString('base64');
                this.books.push(book);
              });
            }
          }, response => {
            // error callback
            console.log(response);
          });
        } else {
          this.$router.push({
            name: 'Index',
            params: {
              emptyContent: 'yes'
            }
          });
        }
      },
      setSearchParams() {
        // 接受搜索参数，搜索
        this.searchWay = this.$route.params.searchWay;
        this.searchContent = this.$route.params.searchContent;
        if (this.searchContent == '' || typeof this.searchWay !== 'number') {
          this.$router.push({
            name: 'Index',
            params: {
              emptyContent: 'yes'
            }
          });
        }
        this.search();
      }
    },
    created() {
      // 接受搜索参数，搜索
      this.setSearchParams();
    },
    watch: {
      $route(to, from) {
        if (from.path == '/') {
          // 刷新 v-selection 组件
          this.synFlag = false;
          setTimeout(() => {
            this.synFlag = true;
          }, 10);
          // 接受搜索参数，搜索
          this.setSearchParams();
        }
      }
    }
  }

</script>

<style scoped>
  .main {
    position: relative;
    overflow: auto;
    width: 100%;
    min-height: 500px;
    background-color: #fff;
  }
  /* 搜索 */

  .search-control {
    position: absolute;
    top: 10px;
    left: 100px;
  }

  .search-control input {
    padding-left: 10px;
    padding-right: 40px;
    height: 44px;
    width: 400px;
    border: none;
    font-size: 16px;
  }
  /*  阴影效果*/

  .input-box {
    display: inline-block;
    position: relative;
    top: 10px;
    margin-left: 20px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 4px 0 rgba(0, 0, 0, .16);
  }

  .input-box:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 5px 1px rgba(0, 0, 0, .16);
  }

  .search-control button {
    background-image: url(../assets/search.png);
    background-repeat: no-repeat;
    background-position: center;
    width: 40px;
    height: 40px;
    border: none;
    background-color: #fff;
    position: relative;
    top: 25px;
    left: -45px;
  }

  .book-content {
    padding: 100px;
  }

  .book-content p {
    text-align: center;
  }

</style>
