/**
 * Created by lhzbxx on 2016/11/5.
 *
 * global.js
 * 管理全局的状态
 */

import * as types from '../mutation-types'
import data from '../../api/data'

const state = {
  region: 1,
  history: []
}

const mutations = {
  [types.CHANGE_REGION] (state, regionIndex) {
    if (!Number.isInteger(regionIndex)) {
      state.region = data.regions.findIndex(item => item.code == regionIndex)
    } else {
      state.region = regionIndex
    }
  },
  [types.BROWSE_PRODUCT] (state, product) {
    state.history.push(product)
    if (state.history.length > 30)
      state.history.pop()
  }
}

export default {
  state,
  mutations
}
