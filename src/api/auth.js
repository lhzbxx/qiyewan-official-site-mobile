import Vue from 'vue'

export default {
  getRegion (cb) {
    if (process.env.NODE_ENV === 'development') {
      cb('SHSH')
    } else {
      Vue.http.get('locate.do').then(
        (response) => {
          response.text().then(
            data => {
              cb(data)
            }
          )
        }
      )
    }
  },
  login (phone, password, cb, errorCb) {
    Vue.http.get('auth?phone=' + phone + '&password=' + password + '&mode=WEB_MOBILE').then(
      (response) => {
        cb(response.body.token)
      },
      (response) => {
        errorCb(response.body)
      })
  },
  loginWithOpenId (openId, cb, errorCb) {
    Vue.http.get('auth/wx.do?openId=' + openId).then(
      (response) => {
        cb(response.body.token)
      },
      (response) => {
        errorCb(response.body)
      }
    )
  },
  bindWxOpenId (token, openId, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token
    Vue.http.post('auth/wx.do', openId).then(
      (response) => {
        cb(response.body)
      },
      (response) => {
        errorCb(response.body)
      }
    )
  },
  requestCaptcha (phone, cb, errorCb) {
    Vue.http.post('captcha.do?phone=' + phone).then(
      (response) => {
        cb(response.body)
      },
      (response) => {
        errorCb(response.body)
      })
  },
  register (phone, password, captcha, cb, errorCb) {
    Vue.http.post('auth', {
      phone: phone,
      password: password,
      captcha: captcha
    }).then(
      (response) => {
        cb(response.body.token)
      },
      (response) => {
        errorCb(response.body)
      }
    )
  },
  resetPassword (phone, password, captcha, cb, errorCb) {
    Vue.http.patch('auth', {
      phone: phone,
      password: password,
      captcha: captcha
    }).then(
      (response) => {
        cb(response.body.token)
      },
      (response) => {
        errorCb(response.body)
      }
    )
  },
  getUser (token, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token
    Vue.http.get('users').then(
      (response) => {
        cb(response.body)
      },
      (response) => {
        errorCb(response.body)
      }
    )
  }
}
