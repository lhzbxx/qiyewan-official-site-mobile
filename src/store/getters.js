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

export const getRegionIndex = state => {
    return state.global.region
}

export const hotProducts = () => {
    return dataApi.hotProducts
}

export const isLogin = state => {
    return state.auth.isLogin
}

export const getPhone = state => {
    return state.auth.user.phone
}

export const getToken = state => {
    return state.auth.user.token
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

export const needLogin = state => {
    return state.global.needLogin
}

export const getCheckout = state => {
    return state.orders.checkout
}

export const regions = () => {
    return dataApi.regions
}

export const cdnPrefix = () => {
    return dataApi.cdnPrefix
}