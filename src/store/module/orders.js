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
  checkout: []
}

const mutations = {
  [types.ADD_TO_ORDER] (state) {
    // state.info.total += 1
    localStorage.setItem("orderInfo", JSON.stringify(state.info))
  },
  [types.REMOVE_ORDER] (state) {
    state.info.total -= 1
    localStorage.setItem("orderInfo", JSON.stringify(state.info))
  },
  [types.CHECKOUT] (state, carts) {
    state.checkout = carts
  },
  [types.GET_DATA_FROM_STORAGE] (state) {
    state.info = JSON.parse(localStorage.getItem('orderInfo'));
  }
}

export default {
  state,
  mutations
}
