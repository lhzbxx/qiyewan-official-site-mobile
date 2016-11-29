/**
 * Created by lhzbxx on 2016/11/5.
 *
 * carts.js
 * 购物车相关
 */

import * as types from '../mutation-types'

const state = {
  info: {
    total: 0,
    page: 0
  },
  savedItems: []
}

const mutations = {
  [types.ADD_TO_ORDER] (state, cartsNum) {
    // state.info.total -= cartsNum
    localStorage.setItem("cartInfo", JSON.stringify(state.info))
  },
  [types.ADD_TO_CART] (state, cart) {
    if (cart.amount == 1) {
      // state.info.total += 1
      localStorage.setItem("cartInfo", JSON.stringify(state.info))
    }
  },
  [types.REMOVE_CART] (state) {
    // state.info.total -= 1
    localStorage.setItem("cartInfo", JSON.stringify(state.info))
  },
  [types.REMOVE_CART] (state) {
    // state.info.total -= 1
    localStorage.setItem("cartInfo", JSON.stringify(state.info))
  },
  [types.GET_DATA_FROM_STORAGE] (state) {
    state.info = JSON.parse(localStorage.getItem('cartInfo'));
  }
}

export default {
  state,
  mutations
}
