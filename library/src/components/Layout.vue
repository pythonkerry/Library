<template>
  <div>
    <div class="app-head">
      <nav>
        <router-link :to="{ path: '/'}" exact active-class="active">图书</router-link>
        <router-link :to="{ path: '/seats'}" active-class="active">座位</router-link>
        <router-link :to="{ path: '/rooms'}" active-class="active">研讨间</router-link>
        <span class="log-control">
          <router-link :to="{ path: '/myinfo'}" v-if="username !== ''" class="log-control-item" title="我的预约">{{ username }}</router-link>
          <span v-if="username !== ''" class="log-control-item" @click="logOut" title="退出登录">| 退出</span>
          <span v-if="username === ''" class="log-control-item" @click="logIn">登录</span>
        </span>
      </nav>
    </div>
    <div class="app-content">
      <keep-alive>
        <router-view :username="username" @on-login="logIn"></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">
      <p>© 2017 ZhiYi</p>
    </div>
<!--    登录对话框-->
    <my-dialog :is-show="isShowLogDialog" @on-close="closeLogInDialog">
      <log-form @has-log="onSuccessLogIn"></log-form>
    </my-dialog>
  </div>
</template>

<script>
  import Dialog from './basic/dialog'
  import LogForm from './basic/logform'

  export default {
    components: {
      MyDialog: Dialog,
      LogForm
    },
    data() {
      return {
        username: '',
        isShowLogDialog: false,
        reserveType: ''
      }
    },
    methods: {
      // 关闭登录框
      closeLogInDialog() {
        this.isShowLogDialog = false;
      },
      // 登录
      logIn() {
        this.isShowLogDialog = true;
      },
      // 退出
      logOut() {
        this.username = '';
        if(this.$route.path == '/myinfo') {
          this.$router.push({
            name: 'Index'
          });
        }
      },
      // 登录成功
      onSuccessLogIn(username) {
        this.username = username;
        this.closeLogInDialog();
      }
    }
  }

</script>

<style>
  body {
    margin: 0;
    padding: 0;
    overflow: auto;
    min-width: 920px;
  }

  .app-head {
    width: 100%;
    background-color: #52c3dd;
    height: 40px;
  }

  nav {
    position: relative;
    width: 80%;
    margin: auto;
    height: 40PX;
    line-height: 40px;
  }

  nav a {
    color: #fff;
    text-decoration: none;
    margin-right: 30px;
    opacity: 0.9;
  }
  
  nav .active {
    opacity: 1;
  }

  .log-control {
    display: inline-block;
    position: absolute;
    right: 0;
  }

  .log-control-item {
    margin-right: 0;
    color: #fff;
    opacity: 0.9;
  }

  nav a:hover {
    opacity: 1;
  }

  .log-control-item:hover {
    opacity: 1;
    cursor: pointer;
  }

  .app-foot {
    text-align: center;
    height: 40px;
    width: 100%;
    line-height: 40px;
    background-color: #52c3dd;
  }

  .app-foot p {
    font-size: 12px;
    margin: 0;
  }

</style>
