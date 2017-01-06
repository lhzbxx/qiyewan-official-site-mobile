import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

let host = process.env.API2

export default {
  getCustomers (phone, cb, errorCb) {
    Vue.http.get(host + '/customers?phone=' + phone).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getContracts (customerId, cb, errorCb) {
    Vue.http.get(host + '/contracts?customerId=' + customerId).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getContractDetails (contractSno, cb, errorCb) {
    Vue.http.get(host + '/contract-details?contractSno=' + contractSno).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getContractServices (contractSno, cb, errorCb) {
    Vue.http.get(host + '/contract-services?contractSno=' + contractSno).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  },
  getContractServiceDetails (contractServiceId, cb, errorCb) {
    Vue.http.get(host + '/contract-service-details?contractServiceId=' + contractServiceId).then((response) => {
      cb(response.body)
    }, (response) => {
      errorCb(response.body)
    })
  }
}
