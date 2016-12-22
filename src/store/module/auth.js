/**
 * Created by lhzbxx on 2016/10/20.
 *
 * auth.js
 * 身份认证相关
 */

import * as types from '../mutation-types'

const state = {
  isLogin: false,
  user: {
    token: '',
    openId: '',
    phone: '',
    avatar: '',
    nickname: '',
    isWxBound: false
  }
}

const mutations = {
  [types.GET_DATA_FROM_STORAGE] (state) {
    state.isLogin = true
    state.user = JSON.parse(window.localStorage.getItem('user'))
  },
  [types.USER_LOGIN] (state, {phone, token}) {
    state.isLogin = true
    state.user.phone = phone
    state.user.token = token
    window.localStorage.createAt = new Date().valueOf()
    save(state)
  },
  [types.USER_LOGOUT] (state) {
    state.isLogin = false
    state.user.phone = ''
    state.user.token = ''
    window.localStorage.removeItem('createAt')
    console.log(window.localStorage.createAt)
    window.localStorage.removeItem('user')
  },
  [types.RECEIVE_USER_INFO] (state, info) {
    state.user.avatar = info.avatar
    state.user.nickname = info.nickname
    state.user.isWxBound = info.isWxBound
    save(state)
  },
  [types.RECEIVE_OPEN_ID] (state, openId) {
    state.user.openId = openId
    save(state)
  }
}

function save (state) {
  window.localStorage.setItem('user', JSON.stringify(state.user))
}

export default {
  state,
  mutations
}
