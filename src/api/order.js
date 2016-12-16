import Vue from 'vue'

export default {
  getOrder (token, serialId, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token;
    Vue.http.get("orders/" + serialId).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getOrders (token, page, orderState, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token;
    var state = ""
    if (orderState != "All") {
      state = "&state=" + orderState
    }
    Vue.http.get("orders?page=" + (page - 1) + state).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body);
    })
  },
  addOrder (token, carts, payment, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token;
    var checkout = []
    for (let i of carts) {
      checkout.push(i.id)
    }
    Vue.http.post("orders", {'carts': checkout, 'payment': payment}).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body);
    })
  },
  removeOrder (token, orderId, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token;
    Vue.http.delete("orders/" + orderId).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body);
    })
  },
  submitReview (token, review, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token;
    Vue.http.post("reviews", review).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body);
    })
  }
}
