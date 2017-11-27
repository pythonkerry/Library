<template>
  <div class="login-form">
    <table>
      <tbody>
        <tr>
          <td class="form-name">学号：</td>
          <td class="form-value"><input type="text" id="username" v-model="usernameModel" placeholder="请输入学号"></td>
          <td class="form-error">{{ uErrorText }}</td>
        </tr>
        <tr>
          <td class="form-name">密码：</td>
          <td class="form-value"><input type="password" id="password" v-model="passwordModel" placeholder="请输入密码"></td>
          <td class="form-error">{{ pErrorText }}</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td class="form-submit"><a class="button" @click="onLogin">登录</a></td>
        </tr>
        <tr>
          <td colspan="2" class="form-fail">{{ errorText }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import crypto from 'crypto'

  export default {
    data() {
      return {
        usernameModel: '',
        passwordModel: '',
        uErrorText: '',
        pErrorText: '',
        errorText: ''
      }
    },
    mounted() {
      var username = document.getElementById("username");
      var password = document.getElementById("password");
      username.onblur = this.usernameCheck;
      password.onblur = this.passwordCheck;
    },
    methods: {
      usernameCheck() {
        if (!/^\d{11}$/g.test(this.usernameModel)) {
          this.uErrorText = '学号为11位数字';
        } else {
          this.uErrorText = '';
        }
      },
      passwordCheck() {
        if (!/^\w{6,16}$/g.test(this.passwordModel)) {
          this.pErrorText = '密码位数为6-16位';
        } else {
          this.pErrorText = '';
        }
      },
      onLogin() {
        // 检查错误状态
        if (this.usernameModel == '' || this.passwordModel == '') {
          this.errorText = '学号或密码不能为空';
        } else {
          if (this.uErrorText == '' && this.pErrorText == '') {
            this.errorText = '';
            // MD5 求 hash 值
            var md5 = crypto.createHash('md5');
            var passMD5 = md5.update(this.passwordModel).digest('hex')
            this.$http.post('/api/login', {
              username: this.usernameModel,
              password: passMD5
            }).then((res) => {
              // 登录成功
              if (res.data.success) {
                this.$emit('has-log', this.usernameModel);
              } else {
                this.errorText = '学号或密码错误';
              }
            }, (error) => {
              console.log(error);
            })
          }
        }
      }
    }
  }

</script>

<style scoped>
  .form-name,
  .form-value {
    padding: 10px 0;
  }

  .form-name {
    width: 80px;
  }

  .form-value {
    width: 200px;
  }

  .form-value input {
    width: 200px;
    height: 25px;
    padding-left: 10px;
  }

  .form-submit {
    padding: 20px 0;
  }

  .form-error {
    padding-left: 20px;
    color: red;
    font-size: 14px;
  }

  .form-fail {
    padding: 20px 0 0;
    color: red;
    font-size: 14px;
  }

  .button {
    background: #4fc08d;
    color: #fff;
    padding: 8px 20px;
    cursor: pointer;
    box-shadow: 0 3px 4px 0px rgba(0, 0, 0, .2);
  }

  .button:hover {
    box-shadow: 0 3px 5px 2px rgba(0, 0, 0, .2);
  }

</style>
