/**
 * Created by lhzbxx on 2016/11/7.
 *
 * orders.js
 * 订单相关
 */

import * as types from '../mutation-types'

const state = {
  info: {
    total: 0,
    page: 0
  },
  savedItems: [],
  checkout: [],
  toPay: null,
  review: null
}

const mutations = {
  [types.ADD_TO_ORDER] (state) {
    // state.info.total += 1
    window.localStorage.setItem('orderInfo', JSON.stringify(state.info))
  },
  [types.REMOVE_ORDER] (state) {
    // state.info.total -= 1
    window.localStorage.setItem('orderInfo', JSON.stringify(state.info))
  },
  [types.CHECKOUT] (state, carts) {
    state.checkout = carts
  },
  [types.GET_DATA_FROM_STORAGE] (state) {
    state.info = JSON.parse(window.localStorage.getItem('orderInfo'))
  },
  [types.TO_PAY] (state, order) {
    state.toPay = order
  },
  [types.REVIEW] (state, product) {
    state.review = product
  }
}

export default {
  state,
  mutations
}
