import Vue from 'vue'

export default {
  getCarts (token, page, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token
    Vue.http.get('carts?page=' + (page - 1)).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  addCart (token, cart, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token
    let url = cart.isOverride ? 'carts?isOverride=true' : 'carts'
    Vue.http.post(url, cart).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  updateCart (token, cart, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token
    Vue.http.patch('carts', cart).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  removeCart (token, cartId, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token
    Vue.http.options.emulateHTTP = true
    Vue.http.delete('carts/' + cartId).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  }
}
