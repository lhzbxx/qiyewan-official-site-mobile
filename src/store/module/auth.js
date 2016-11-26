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
    phone: "",
    token: "",
    avatar: "",
    nickname: ""
  }
}

const mutations = {
  [types.GET_DATA_FROM_STORAGE] (state) {
    state.isLogin = true
    state.user = JSON.parse(localStorage.getItem('user'));
  },
  [types.USER_LOGIN] (state, {phone, token}) {
    state.isLogin = true
    state.user.phone = phone
    state.user.token = token
    localStorage.createAt = new Date().valueOf()
    localStorage.setItem('user', JSON.stringify(state.user));
  },
  [types.USER_LOGOUT] (state) {
    state.isLogin = false
    state.user.phone = ""
    state.user.token = ""
    localStorage.removeItem('createAt')
    console.log(localStorage.createAt)
    localStorage.removeItem('user')
  }
}

export default {
  state,
  mutations
}
