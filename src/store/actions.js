/**
 * Created by lhzbxx on 2016/10/20.
 *
 * actions.js
 */

import * as types from './mutation-types'
import dataApi from '../api/data'
import authApi from '../api/auth'
import cartApi from '../api/cart'
import productApi from '../api/product'
import orderApi from '../api/order'

export const init = ({commit, state}) => {
  if (localStorage.createAt) {
    if (new Date().valueOf() - localStorage.createAt < 15 * 24 * 60 * 60 * 1000) {
      commit(types.GET_DATA_FROM_STORAGE)
    }
  }
  authApi.getRegion(region => {
    console.log('自动切换到区域：' + region)
    commit(types.CHANGE_REGION, region)
  })
  authApi.getUser(state.auth.user.token,
    data => {
      if (data.detail == "Error.Auth.INVALID_TOKEN") {
        state.auth.isLogin = false
      } else {
        commit('RECEIVE_USER_INFO', data)
      }
    }
  )
}

export const getProducts = ({commit, state}) => {
  return new Promise((resolve, reject) => {
    if (state.global.cache['ALL']) {
      resolve(state.global.cache['ALL'])
    } else {
      productApi.getProducts(dataApi.regions[state.global.region].code,
        data => {
          let index = 'ALL'
          commit(types.CACHE_DATA, {index, data})
          resolve(data)
        },
        error => {
          reject(error)
        }
      )
    }
  })
}

export const getProductList = ({commit, state}, classification) => {
  return new Promise((resolve, reject) => {
    if (state.global.cache[classification]) {
      resolve(state.global.cache[classification])
    } else {
      productApi.getProductList(dataApi.regions[state.global.region].code, classification,
        data => {
          let index = classification
          commit(types.CACHE_DATA, {index, data})
          resolve(data)
        },
        error => {
          reject(error)
        }
      )
    }
  })
}

export const getProductDetail = ({commit, state}, serialId) => {
  return new Promise((resolve, reject) => {
    productApi.getProductDetail(serialId,
      data => {
        commit(types.BROWSE_PRODUCT, data)
        resolve(data)
      },
      error => {
        reject(error)
      }
    )
  })
}

export const requestCaptcha = ({}, phone) => {
  return new Promise((resolve, reject) => {
    authApi.requestCaptcha(phone,
      () => {
        resolve()
      },
      error => {
        reject(error)
      }
    )
  })
}

export const userRegister = ({commit}, {phone, password, captcha}) => {
  return new Promise((resolve, reject) => {
    authApi.register(phone, password, captcha,
      token => {
        if (token) {
          commit(types.USER_LOGIN, {phone, token})
          resolve()
        }
      },
      error => {
        reject(error)
      }
    )
  })
}

export const userLogin = ({commit}, {phone, password}) => {
  return new Promise((resolve, reject) => {
    authApi.login(phone, password,
      token => {
        if (token) {
          commit(types.USER_LOGIN, {phone, token})
          resolve()
        }
      },
      error => {
        reject(error)
      }
    );
  })
}

export const userResetPassword = ({commit}, {phone, password, captcha}) => {
  return new Promise((resolve, reject) => {
    authApi.resetPassword(phone, password, captcha,
      token => {
        if (token) {
          commit(types.USER_LOGIN, {phone, token})
          resolve()
        }
      },
      error => {
        reject(error)
      }
    );
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
        reject(error)
      }
    )
  })
}

export const getCarts = ({commit, state}, page) => {
  return new Promise((resolve, reject) => {
    cartApi.getCarts(state.auth.user.token, page,
      carts => {
        // commit(types.RECEIVE_CART, carts)
        resolve(carts)
      },
      error => {
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

export const getOrders = ({commit, state}, {page, orderState}) => {
  return new Promise((resolve, reject) => {
    orderApi.getOrders(state.auth.user.token, page, orderState,
      orders => {
        // commit(types.RECEIVE_ORDER, orders)
        resolve(orders)
      },
      error => {
        reject(error)
      }
    )
  })
}

export const cancelOrder = ({commit, state}, serialId) => {
  return new Promise((resolve, reject) => {
    orderApi.removeOrder(state.auth.user.token, serialId,
      result => {
        commit(types.REMOVE_ORDER, serialId)
        resolve(result)
      },
      error => {
        reject(error)
      }
    )
  })
}

export const submitReview = ({state}, review) => {
  return new Promise((resolve, reject) => {
    orderApi.submitReview(state.auth.user.token, review,
      result => {
        resolve(result)
      },
      error => {
        reject(error)
      }
    )
  })
}

export const getUserInfo = ({commit, state}) => {
  return new Promise((resolve, reject) => {
    authApi.getUser(state.auth.user.token,
      result => {
        commit('RECEIVE_USER_INFO', result)
        resolve(result)
      },
      error => {
        reject(error)
      }
    )
  })
}
