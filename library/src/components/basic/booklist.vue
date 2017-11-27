<template>
  <div>
    <div class="book-item" v-for="item in books" @click="toDetails(item.ISBN, item.bookName)">
      <div class="book-cover">
        <img :src="'data:image/png;base64,' + item.bookCover">
      </div>
      <div class="book-info">
        <table>
          <tbody>
            <tr>
              <td colspan="2"><div>{{ item.bookName }}</div></td>
            </tr>
            <tr>
              <td><div class="info-name">作者：</div></td>
              <td><div class="info-value">{{ item.writer }}</div></td>
              <td><div class="info-name">索书号：</div></td>
              <td><div class="info-value">{{ item.classNumber + '/' + item.writerNumber}}</div></td>
            </tr>
            <tr>
              <td><div class="info-name">出版社：</div></td>
              <td><div class="info-value">{{ item.press }}</div></td>
              <td><div class="info-name">年份：</div></td>
              <td><div class="info-value">{{ item.yearOfPublish }}</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      books: {
        type: Array,
        default: [{
          ISBN: '',
          bookName: '',
          classNumber: '',
          press: '',
          writer: '',
          writerNumber: '',
          yearOfPublish: '',
          bookCover: ''
        }]
      }
    },
    methods: {
      toDetails(ISBN, bookName) {
        this.$router.push({
          name: 'Details',
          params: {
            ISBN,
            bookName
          }
        });
      }
    }
  }

</script>

<style scoped>
  .book-item {
    width: auto;
    height: 140px;
    padding: 15px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 4px 0 rgba(0, 0, 0, .16);
    margin-bottom: 20px;
  }

  .book-item:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 5px 3px rgba(0, 0, 0, .16);
  }

  .book-cover {
    display: inline-block;
    width: 100px;
    height: 140px;
    border: 1px solid #e3e3e3;
  }

  .book-cover img {
    width: 100%;
    height: 100%;
  }

  .book-info {
    display: inline-block;
    height: 140px;
    margin-left: 20px;
    color: #495a80;
  }

  .info-name {
    width: 80px;
  }

  .info-value {
    width: 190px;
  }

</style>
