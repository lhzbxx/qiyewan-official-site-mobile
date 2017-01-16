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
  if (window.localStorage.createAt) {
    if (new Date().valueOf() - window.localStorage.createAt < 15 * 24 * 60 * 60 * 1000) {
      commit(types.GET_DATA_FROM_STORAGE)
    }
  }
  // if (!window.localStorage.locate || new Date().valueOf() - window.localStorage.locate > 24 * 60 * 60 * 1000) {
  if (!window.localStorage.locate || new Date().valueOf() - window.localStorage.locate > 60 * 1000) {
    authApi.getRegion(region => {
      console.log('自动切换到区域：' + region)
      commit(types.CHANGE_REGION, region)
    })
    window.localStorage.locate = new Date().valueOf()
  } else {
    let region = window.localStorage.getItem('region')
    if (region) {
      commit(types.CHANGE_REGION, region)
    }
  }
  // 1. 如果 token 不存在，且用户在使用微信内置浏览器，则先尝试使用 openid 登录。
  // 2. 如果 token 存在，且用户在使用微信内置浏览器，则先判断用户是否已经绑定微信，如果没有，则尝试绑定。
  // 3. 如果用户没有在使用微信内置浏览器，则只验证 token 的有效性。
  if (isWx() && !state.auth.user.openId && (!window.localStorage.wx || new Date().valueOf() - window.localStorage.wx > 5 * 60 * 1000)) {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6d3c480373a5418f&redirect_uri=' +
      'http%3A%2F%2Fwww.qiyewan.com/assets/wx_redirect.htm' +
      '&response_type=code&scope=snsapi_base&state=' +
      'INIT' +
      '#wechat_redirect'
    window.localStorage.wx = new Date().valueOf()
  }
  // 异步验证 token 是否已经失效，同时刷新用户的信息数据（）
  authApi.getUser(state.auth.user.token,
    data => {
      if (data.type === 'ERROR.NO_AUTH') {
        state.auth.isLogin = false
      } else {
        commit('RECEIVE_USER_INFO', data)
      }
    }
  )
}

function isWx () {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

export const getOpenId = ({state, commit}, code) => {
  return new Promise((resolve, reject) => {
    authApi.getWxBaseInfo(code,
      data => {
        commit(types.RECEIVE_OPEN_ID, data.openid)
        if (!state.auth.isLogin) {
          authApi.loginWithOpenId(data.openid,
            token => {
              if (token) {
                let phone = ''
                commit(types.USER_LOGIN, {phone, token})
                resolve()
              }
            },
            () => {
              reject()
            }
          )
        }
      }
    )
  })
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
    if (state.global.storage[serialId]) {
      console.log('读取：' + serialId)
      resolve(state.global.storage[serialId])
    } else {
      productApi.getProductDetail(serialId,
        data => {
          let index = serialId
          commit(types.STORAGE_DATA, {index, data})
          commit(types.BROWSE_PRODUCT, data)
          resolve(data)
        },
        error => {
          reject(error)
        }
      )
    }
  })
}

export const isRegistered = ({commit}, phone) => {
  return new Promise((resolve, reject) => {
    authApi.isRegistered(phone,
      response => {
        resolve(response)
      },
      error => {
        reject(error)
      }
    )
  })
}

export const requestCaptcha = ({commit}, phone) => {
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
    )
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

export const removeCart = ({commit, state}, cartIds) => {
  return new Promise((resolve, reject) => {
    cartApi.removeCart(state.auth.user.token, cartIds,
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
    orderApi.addOrder(state.auth.user.token, carts, payment, state.auth.user.openId,
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

export const getOrders = ({commit, state}, {page, orderStage}) => {
  return new Promise((resolve, reject) => {
    orderApi.getOrders(state.auth.user.token, page, orderStage,
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
    orderApi.cancelOrder(state.auth.user.token, serialId,
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

export const removeOrder = ({commit, state}, serialId) => {
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
