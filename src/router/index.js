import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../pages/Home.vue'
import Orders from '../pages/Orders.vue'
import Carts from '../pages/Carts.vue'
import Mine from '../pages/Mine.vue'
import ProductClassification from '../pages/ProductClassification.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import ProductList from '../pages/ProductList.vue'
import Auth from '../pages/Auth.vue'
import Checkout from '../pages/Checkout.vue'
import Pay from '../pages/Pay.vue'
import NotFound from '../pages/NotFound.vue'
import Areas from '../pages/Areas.vue'
import Review from '../pages/Review.vue'
import AboutUs from '../pages/AboutUs.vue'
import ContactUs from '../pages/ContactUs.vue'
import BrowsingHistory from '../pages/BrowsingHistory.vue'
import Contract from '../pages/Contract.vue'
import Success from '../pages/Success.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/review',
    name: 'review',
    beforeEnter: requireAuth,
    component: Review
  },
  {
    path: '/product/list/:classificationCode',
    name: 'product-classification',
    component: ProductClassification
  },
  {
    path: '/product/detail/:serialId',
    name: 'product-detail',
    component: ProductDetail
  },
  {
    path: '/product/list',
    name: 'product-list',
    component: ProductList
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/order',
    name: 'order',
    beforeEnter: requireAuth,
    component: Orders
  },
  {
    path: '/cart',
    name: 'cart',
    beforeEnter: requireAuth,
    component: Carts
  },
  {
    path: '/checkout',
    name: 'checkout',
    beforeEnter: requireAuth,
    component: Checkout
  },
  {
    path: '/pay',
    name: 'pay',
    beforeEnter: requireAuth,
    component: Pay
  },
  {
    path: '/browsing-history',
    name: 'browsing-history',
    component: BrowsingHistory
  },
  {
    path: '/areas',
    name: 'areas',
    component: Areas
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUs
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUs
  },
  {
    path: '/contract',
    name: 'contract',
    component: Contract
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/404',
    component: NotFound,
    name: 'not-found'
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  mode: 'hash',
  routes: routes,
  // scrollBehavior (to, from, savedPosition) {
  //   return {x: 0, y: 0}
  // }
  root: '/home'
})

function requireAuth(from, to, next) {
  if (!store.getters.isLogin) {
    next({
      path: '/auth'
    })
  } else {
    next()
  }
  next()
}
