<template>
  <div id="auth">
    <lh-page-header :title="headerTitle"></lh-page-header>
    <div id="auth-body">
      <mt-field label="手机号"
                class="input-field"
                placeholder="请输入手机号"
                v-model="form.phone"
                type="tel"></mt-field>
      <mt-field label="验证码"
                v-if="state > 0"
                class="input-field"
                v-model="form.captcha"
                placeholder="请输入验证码">
        <div id="captcha-button"
             v-bind:class="{inactive: isCounting}"
             v-on:click="getCaptcha()">
          {{ isCounting ? counter + '秒' : '获取验证码' }}
        </div>
      </mt-field>
      <mt-field label="密码"
                class="input-field"
                placeholder="请输入密码"
                v-model="form.password"
                type="password"></mt-field>
      <mt-field label="确认密码"
                v-if="state > 0"
                class="input-field"
                v-model="form.password2"
                placeholder="请再次输入密码"
                type="password"></mt-field>
      <mt-button type="primary"
                 id="submitButton"
                 @click.native="submit"
                 size="large">
        {{ submitButton }}
      </mt-button>
      <a id="reset-password-button"
         v-on:click="state = 2"
         v-if="state == 0">找回密码
      </a>
      <div class="clearfix"></div>
      <div id="split" v-if="state < 2">
        <div class="split-line">&nbsp;</div>
        <span id="split-or">or</span>
        <div class="split-line">&nbsp;</div>
      </div>
      <div id="no-account"
           v-if="state < 2">
        {{ state == 0 ? '没有账户？' : '已有账号？' }}
        <a v-on:click="state = 1 - state">{{ state == 0 ? '立即注册' : '马上登录' }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default {
    data() {
      return {
        // 0: 登录
        // 1: 注册
        // 2: 忘记密码
        state: 0,
        form: {
          phone: null,
          password: null,
          captcha: null
        },
        isCounting: false,
        counter: 60
      }
    },
    methods: {
      getCaptcha() {
        this.$store.dispatch('requestCaptcha', this.form.phone).then(
          () => {
            if (this.isCounting) return
            else this.isCounting = true
            this.counting()
          },
          error => {
          }
        )
      },
      counting() {
        setTimeout(() => {
          if (this.counter == 0) {
            this.counter = 60
            this.isCounting = false
          } else {
            this.counter--
            this.counting()
          }
        }, 1000)
      },
      submit() {
        let vm = this
        switch (this.state) {
          case 0:
            this.$store.dispatch('userLogin', this.form).then(
              () => {
                vm.$router.go(-1)
              },
              error => {
                switch (error.detail) {
                  case 'Error.Auth.USER_NOT_EXISTS':
                    Toast({
                      message: '该手机号尚未注册',
                      position: 'bottom',
                      duration: 3000
                    })
                    break
                  case 'Error.Auth.WRONG_PASSWORD':
                    Toast({
                      message: '密码不正确',
                      position: 'bottom',
                      duration: 3000
                    })
                    break
                  default:
                    Toast({
                      message: '登录失败',
                      position: 'bottom',
                      duration: 3000
                    })
                }
              }
            )
            break
          case 1:
            this.$store.dispatch('userRegister', this.form).then(
              () => {
                vm.$router.go(-1)
              },
              error => {
                switch (error.detail) {
                  case 'Error.Auth.USER_EXISTS':
                    Toast({
                      message: '该手机号已被注册',
                      position: 'bottom',
                      duration: 3000
                    })
                    break
                  case 'Error.Action.WRONG_CAPTCHA':
                    Toast({
                      message: '验证码不正确',
                      position: 'bottom',
                      duration: 3000
                    })
                    break
                  default:
                    Toast({
                      message: '注册失败',
                      position: 'bottom',
                      duration: 3000
                    })
                }
              }
            )
            break
          case 2:
            this.$store.dispatch('userResetPassword', this.form).then(
              () => {
                vm.$router.go(-1)
              },
              error => {
                switch (error.detail) {
                  default:
                    Toast({
                      message: '重置密码失败',
                      position: 'bottom',
                      duration: 3000
                    })
                }
              }
            )
            break
        }
      }
    },
    computed: {
      headerTitle() {
        switch (this.state) {
          case 0:
            return '登 录'
          case 1:
            return '注 册'
          case 2:
            return '重置密码'
        }
      },
      submitButton() {
        switch (this.state) {
          case 0:
            return '登 录'
          case 1:
            return '注 册'
          case 2:
            return '确 认'
        }
      }
    },
    mounted() {
      this.state = this.$route.query.state | 0
    }
  }
</script>

<style scoped>
  #auth {
    padding-top: 44px;
    background: #f9f9f9;
    min-height: 100%;
  }

  #auth-body {
    padding: 20px 10px 0;
  }

  #split {
    display: flex;
    text-align: center;
    justify-content: center;
    height: 40px;
    align-items: center;
  }

  #split-or {
    margin: 0 10px;
    color: #ccc;
  }

  .split-line {
    border-bottom: 1px solid #eee;
    width: 36%;
    height: 0;
  }

  #no-account {
    text-align: center;
    color: #aaa;
  }

  #no-account a {
    color: #0096cb;
  }

  #reset-password-button {
    line-height: 40px;
    color: #aaa;
    float: right;
  }

  #submitButton {
    margin-top: 20px;
  }

  #captcha-button {
    width: 110px;
    height: 48px;
    line-height: 48px;
    background: #26a2ff;
    color: white;
    text-align: center;
  }

  #captcha-button.inactive {
    opacity: 0.5;
  }

  .input-field {
    border: 1px solid #eee;
    margin-top: -1px;
  }
</style>
