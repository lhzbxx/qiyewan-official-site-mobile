/**
 * Created by lhzbxx on 2016/10/20.
 *
 * actions.js
 */

import * as types from './mutation-types'
import authApi from '../api/auth'
import cartApi from '../api/cart'
import orderApi from '../api/order'

export const checkToken = ({commit}) => {
    if (localStorage.createAt) {
        if (new Date().valueOf() - localStorage.createAt < 15 * 24 * 60 * 60 * 1000) {
            commit(types.GET_DATA_FROM_STORAGE)
        }
    }
}

export const userLogin = ({commit}, {phone, password}) => {
    return new Promise((resolve, reject) => {
        authApi.login(phone, password,
            token => {
                console.log(token)
                if (token) {
                    commit(types.USER_LOGIN_SUCCESS, {phone, token})
                    resolve()
                }
            },
            error => {
                console.log(error)
                reject(error)
            }
        );
    })
}

export const requestCaptcha = ({commit}, phone) => {
    return new Promise((resolve, reject) => {
        authApi.requestCaptcha(phone,
            token => {
                resolve()
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}

export const userRegister = ({commit}, {phone, password, captcha}) => {
    return new Promise((resolve, reject) => {
        authApi.register(phone, password, captcha,
            token => {
                console.log(token)
                if (token) {
                    commit(types.USER_LOGIN_SUCCESS, {phone, token})
                    resolve()
                }
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}

export const getCarts = ({commit, state}, page) => {
    return new Promise((resolve, reject) => {
        cartApi.getCarts(state.auth.user.token, page,
            carts => {
                commit(types.RECEIVE_CART, carts)
                resolve(carts)
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}

export const addToCart = ({commit, state}, cart) => {
    return new Promise((resolve, reject) => {
        cartApi.addCart(state.auth.user.token, cart,
            data => {
                commit(types.ADD_TO_CART, data)
                resolve(data)
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}

export const removeCart = ({commit, state}, cartId) => {
    return new Promise((resolve, reject) => {
        cartApi.removeCart(state.auth.user.token, cartId,
            response => {
                commit(types.REMOVE_CART)
                resolve(response)
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}

export const updateCart = ({commit, state}, cart) => {
    return new Promise((resolve, reject) => {
        cartApi.updateCart(state.auth.user.token, cart,
            cart => {
                resolve(cart)
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}

export const getOrders = ({commit, state}, {page, orderState}) => {
    return new Promise((resolve, reject) => {
        orderApi.getOrders(state.auth.user.token, page, orderState,
            orders => {
                commit(types.RECEIVE_ORDER, orders)
                resolve(orders)
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}

export const addToOrder = ({commit, state}, {carts, payment}) => {
    return new Promise((resolve, reject) => {
        orderApi.addOrder(state.auth.user.token, carts, payment,
            order => {
                commit(types.ADD_TO_ORDER, carts.length)
                resolve(order)
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}

export const cancelOrder = ({commit, state}, serialId) => {
    return new Promise((resolve, reject) => {
        orderApi.removeOrder(state.auth.user.token, serialId,
            response => {
                commit(types.REMOVE_ORDER, serialId)
                resolve(response)
            },
            error => {
                console.log(error)
                reject(error)
            }
        )
    })
}
