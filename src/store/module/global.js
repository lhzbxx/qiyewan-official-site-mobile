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
  cache: [],
  storage: []
}

const mutations = {
  [types.CHANGE_REGION] (state, regionIndex) {
    // 清空缓存。
    state.cache = []
    // 判断传值为index或region对象。
    if (!Number.isInteger(regionIndex)) {
      state.region = data.regions.findIndex(item => item.code === regionIndex)
      state.region = state.region === -1 ? 1 : state.region
    } else {
      state.region = regionIndex
    }
    window.localStorage.setItem('region', state.region)
  },
  [types.BROWSE_PRODUCT] (state, product) {
    state.history.push(product)
    // 最多保持30条记录。
    if (state.history.length > 30) {
      state.history.pop()
    }
  },
  [types.CACHE_DATA] (state, payload) {
    console.log('已缓存：' + payload.index)
    state.cache[payload.index] = payload.data
  },
  [types.STORAGE_DATA] (state, payload) {
    console.log('已缓存：' + payload.index)
    state.storage[payload.index] = payload.data
  }
}

export default {
  state,
  mutations
}
