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
                 id="submit-button"
                 @click.native="submit"
                 size="large">
        {{ submitButton }}
      </mt-button>
      <a id="reset-password-button"
         v-on:click="state = 2"
         v-if="state === 0">找回密码
      </a>
      <p id="contract-block"
         v-if="state === 1">
        注册表示同意
        <span id="contract-button"
              v-on:click="handleContractButton">《企业湾用户服务协议》</span>
      </p>
      <div class="clearfix"></div>
      <div id="split" v-if="state < 2">
        <div class="split-line">&nbsp;</div>
        <span id="split-or">or</span>
        <div class="split-line">&nbsp;</div>
      </div>
      <div id="no-account"
           v-if="state < 2">
        {{ state === 0 ? '没有账户？' : '已有账号？' }}
        <a v-on:click="state = 1 - state">{{ state === 0 ? '立即注册' : '马上登录' }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    data () {
      return {
        // 0: 登录
        // 1: 注册
        // 2: 忘记密码
        state: 0,
        form: {
          phone: '',
          password: '',
          captcha: ''
        },
        isCounting: false,
        counter: 60
      }
    },
    methods: {
      getCaptcha () {
        if (this.isCounting) return
        else this.isCounting = true
        let reg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!reg.test(this.form.phone)) {
          Toast({
            message: '手机号格式不正确',
            position: 'bottom',
            duration: 3000
          })
          this.isCounting = false
        }
        if (this.state === 2) {
          vm.$store.dispatch('requestCaptcha', vm.form.phone)
          vm.counting()
          return
        }
        let vm = this
        vm.$store.dispatch('isRegistered', vm.form.phone).then(
          data => {
            if (!data.registered) {
              vm.$store.dispatch('requestCaptcha', vm.form.phone)
              vm.counting()
            } else {
              vm.isCounting = false
              Toast({
                message: '手机号已被注册',
                position: 'bottom',
                duration: 3000
              })
            }
          }
        )
      },
      counting () {
        setTimeout(() => {
          if (this.counter === 0) {
            this.counter = 60
            this.isCounting = false
          } else {
            this.counter--
            this.counting()
          }
        }, 1000)
      },
      handleContractButton () {
        this.$router.push({name: 'contract'})
      },
      submit () {
        let vm = this
        switch (this.state) {
          case 0:
            this.$store.dispatch('userLogin', this.form).then(
              () => {
                vm.$router.go(-1)
              },
              error => {
                Toast({
                  message: error.message,
                  position: 'bottom',
                  duration: 3000
                })
              }
            )
            break
          case 1:
            this.$store.dispatch('userRegister', this.form).then(
              () => {
                vm.$router.go(-1)
              },
              error => {
                Toast({
                  message: error.message,
                  position: 'bottom',
                  duration: 3000
                })
              }
            )
            break
          case 2:
            this.$store.dispatch('userResetPassword', this.form).then(
              () => {
                vm.$router.go(-1)
              },
              error => {
                Toast({
                  message: error.message,
                  position: 'bottom',
                  duration: 3000
                })
              }
            )
            break
        }
      }
    },
    computed: {
      headerTitle () {
        switch (this.state) {
          case 0:
            return '登 录'
          case 1:
            return '注 册'
          case 2:
            return '重置密码'
        }
      },
      submitButton () {
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
    mounted () {
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
    color: #f29600;
    text-decoration: underline;
    float: right;
  }

  #contract-block {
    font-size: 13px;
  }

  #contract-button {
    line-height: 40px;
    color: #f29600;
    text-decoration: underline;
  }

  #submit-button {
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
