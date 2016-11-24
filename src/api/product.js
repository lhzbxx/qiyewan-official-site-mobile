import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = process.env.API

export default {
  getProductDetail (serialId, cb, errorCb) {
    Vue.http.get("products/" + serialId).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getProductReviews (serialId, cb, errorCb) {
    Vue.http.get("products/" + serialId + "/reviews").then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getProductFaqs (serialId, cb, errorCb) {
    Vue.http.get("products/" + serialId + "/faq").then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getProductList (regionCode, category, cb, errorCb) {
    Vue.http.get("products?regionCode=" + regionCode + "&classificationName=" + category).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getNavList (regionCode, cb, errorCb){
    Vue.http.get("products?regionCode=" + regionCode).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  sendReview (token, review, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = token;
    Vue.http.post("reviews/", review).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  }
}
