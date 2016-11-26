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
  history: [],
  cache: []
}

const mutations = {
  [types.CHANGE_REGION] (state, regionIndex) {
    // 清空缓存。
    state.cache = []
    // 判断传值为index或region对象。
    if (!Number.isInteger(regionIndex)) {
      state.region = data.regions.findIndex(item => item.code == regionIndex)
    } else {
      state.region = regionIndex
    }
  },
  [types.BROWSE_PRODUCT] (state, product) {
    state.history.push(product)
    // 最多保持30条记录。
    if (state.history.length > 30)
      state.history.pop()
  },
  [types.CACHE_DATA] (state, index, data) {
    state.cache[index] = data
  }
}

export default {
  state,
  mutations
}
