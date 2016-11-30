/**
 * Created by lhzbxx on 2016/10/20.
 *
 * actions.js
 */

import dataApi from '../api/data'

export const getRegions = () => {
  return dataApi.regions
}

export const getRegion = state => {
  return dataApi.regions[state.global.region]
}

export const hotProducts = () => {
  return dataApi.hotProducts
}

export const isLogin = state => {
  return state.auth.isLogin
}

export const getHistory = state => {
  return state.global.history
}

export const getAuth = state => {
  return state.auth.user
}

export const cartNum = state => {
  if (state.carts.info) {
    return state.carts.info.total
  } else {
    return 0
  }
}

export const orderNum = state => {
  if (state.orders.info) {
    return state.orders.info.total
  } else {
    return 0
  }
}

export const getCheckout = state => {
  return state.orders.checkout
}

export const getReview = state => {
  return state.orders.review
}
