<template>
  <div class="seats-main">
    <div class="seats-wrap">
      <div class="seats-left">
        <ul>
          <router-link v-for="item in stacks" :key="item.name" :to="{ path: item.path }" tag="li" active-class="active">
            {{ item.name }}
          </router-link>
        </ul>

      </div>
      <div class="seats-right">
        <keep-alive>
          <router-view @on-reserve="onReserve" ref="child1"></router-view>
        </keep-alive>
      </div>
    </div>
    <my-dialog :is-show="isShowReserveDialog" @on-close="closeReserveDialog">
      <reserve :reserveType="reserveType" :username="username" :seatNum="seatNum" @on-refresh="onRefresh"></reserve>
    </my-dialog>
  </div>
</template>

<script>
  import Dialog from './basic/dialog'
  import Reserve from './basic/reserve'

  export default {
    components: {
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
        reserveType: 'seat',
        seatNum: '',
        isShowReserveDialog: false,
        stacks: [{
            name: '二楼北：工程与信息技术书库',
            path: 'n2'
          },
          {
            name: '二楼南：社会科学书库 ',
            path: 's2'
          },
          {
            name: '三楼北：语言文史书库 ',
            path: 'n3'
          },
          {
            name: '三楼南：自科与外文书库',
            path: 's3'
          }
        ]
      }
    },
    methods: {
      closeReserveDialog() {
        this.isShowReserveDialog = false;
      },
      onReserve(seatNum) {
        if (this.username != '') {
          this.seatNum = seatNum;
          this.isShowReserveDialog = true;
        } else {
          this.$emit('on-login');
        }
      },
      onRefresh() {
        this.$refs.child1.$refs.child2.update();
      }
    }
  }

</script>

<style scoped>
  .seats-main {
    padding: 50px 0;
    min-height: 400px;
  }

  .seats-wrap {
    width: 800px;
    min-height: 450px;
    margin: auto;
    overflow: auto;
  }

  .seats-left {
    float: left;
    margin-left: 2px;
    width: 210px;
    min-height: 420px;
    border: 1px solid #e3e3e3;
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .16);
  }

  .seats-left ul {
    padding: 10px;
  }

  .seats-left li {
    list-style: none;
    padding: 5px 0;
    cursor: pointer;
    color: #495a80;
  }

  .seats-left li.active,
  .seats-left li:hover {
    background: #52c3dd;
    color: #fff;
  }

  .seats-right {
    float: right;
    margin-right: 2px;
    margin-bottom: 2px;
    min-width: 550px;
    min-height: 420px;
    border: 1px solid #e3e3e3;
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .16);
  }

</style>
