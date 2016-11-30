import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = process.env.API

export default {
  getRegion (cb) {
    if (process.env.NODE_ENV == "development") {
      cb("SHSH")
    } else {
      Vue.http.get("region").then(
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
    Vue.http.get("auth?phone=" + phone + "&password=" + password + "&mode=Mobile").then(
      (response) => {
        if (response.body.error == 0) {
          cb(response.body.detail);
        } else {
          errorCb(response.body);
        }
      }, (response) => {
        errorCb(response.body);
      })
  },
  requestCaptcha (phone, cb, errorCb) {
    Vue.http.post("captcha/" + phone).then(
      (response) => {
        if (response.body.error == 0) {
          cb(response.body.detail);
        } else {
          errorCb(response.body);
        }
      }, (response) => {
        errorCb(response.body);
      })
  },
  register (phone, password, captcha, cb, errorCb) {
    Vue.http.post("auth", {
      phone: phone,
      password: password,
      captcha: captcha
    }).then(
      (response) => {
        if (response.body.error == 0) {
          cb(response.body.detail);
        } else {
          errorCb(response.body)
        }
      }, (response) => {
        errorCb(response.body)
      }
    )
  },
  resetPassword (phone, password, captcha, cb, errorCb) {
    Vue.http.patch("auth", {
      phone: phone,
      password: password,
      captcha: captcha
    }).then(
      (response) => {
        if (response.body.error == 0) {
          cb(response.body.detail);
        } else {
          errorCb(response.body)
        }
      }, (response) => {
        errorCb(response.body)
      }
    )
  },
  getUser (token, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token;
    Vue.http.get("users").then(
      (response) => {
        cb(response.body)
      }
      , (response) => {
        errorCb(response.body)
      }
    )
  }
}
