/**
 * Created by lhzbxx on 2016/10/20.
 *
 * index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import auth from './module/auth'
import carts from './module/carts'
import orders from './module/orders'
import global from './module/global'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  actions,
  modules: {
    auth,
    carts,
    orders,
    global
  }
  // 注意：
  // 在发布时需要注释该行，以免影响性能！
  // strict: true
})
