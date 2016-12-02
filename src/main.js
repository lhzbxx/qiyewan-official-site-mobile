import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

import {Navbar, TabItem} from 'mint-ui';
import {Swipe, SwipeItem} from 'mint-ui';
import {TabContainer, TabContainerItem} from 'mint-ui';
import {Lazyload} from 'mint-ui';
import {Header} from 'mint-ui';
import {Button} from 'mint-ui';
import {Field} from 'mint-ui';
import {Cell, Radio} from 'mint-ui';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.use(Lazyload);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
Vue.component(Cell.name, Cell);
Vue.component(Radio.name, Radio);

import TableHeader from './components/TableHeader.vue'
import TableEntry from './components/TableEntry.vue'
import Product from './components/Product.vue'
import BlockHeader from './components/BlockHeader.vue'
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'
import PageHeader from './components/PageHeader.vue'
import ListHeader from './components/ListHeader.vue'
import TabsHeader from './components/TabsHeader.vue'
import OrderHeader from './components/OrderHeader.vue'
import Services from './components/Services.vue'
import CartDetail from './components/CartDetail.vue'
import Loading from './components/Loading.vue'
import NoThings from './components/NoThings.vue'
import Rater from './components/Rater.vue'

Vue.component('lh-table-header', TableHeader)
Vue.component('lh-table-entry', TableEntry)
Vue.component('lh-product', Product)
Vue.component('lh-block-header', BlockHeader)
Vue.component('lh-home-header', HomeHeader)
Vue.component('lh-home-footer', HomeFooter)
Vue.component('lh-page-header', PageHeader)
Vue.component('lh-list-header', ListHeader)
Vue.component('lh-services', Services)
Vue.component('lh-cart-detail', CartDetail)
Vue.component('lh-tabs-header', TabsHeader)
Vue.component('lh-order-header', OrderHeader)
Vue.component('lh-loading', Loading)
Vue.component('lh-no-things', NoThings)
Vue.component('lh-rater', Rater)

import App from './App'
import Home from './pages/Home.vue'
import Orders from './pages/Orders.vue'
import Carts from './pages/Carts.vue'
import Mine from './pages/Mine.vue'
import ProductClassification from './pages/ProductClassification.vue'
import ProductDetail from './pages/ProductDetail.vue'
import ProductList from './pages/ProductList.vue'
import Auth from './pages/Auth.vue'
import Pay from './pages/Pay.vue'
import NotFound from './pages/NotFound.vue'
import Areas from './pages/Areas.vue'
import Review from './pages/Review.vue'
import AboutUs from './pages/AboutUs.vue'
import ContactUs from './pages/ContactUs.vue'
import BrowsingHistory from './pages/BrowsingHistory.vue'
import Contract from './pages/Contract.vue'
import Success from './pages/Success.vue'

store.dispatch('init')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/order/:orderSerialId/product/:productSerialId/review',
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

const router = new VueRouter({
  mode: 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
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

Vue.filter('cdn-filter', (value) => 'http://cdn.qiyewan.com/' + value)

Vue.filter('sub-total-price-filter', (checkout) => {
  let amount = checkout.amount
  let member = checkout.member
  if (checkout.product.serialId.substr(4) === 'HR0003') {
    return member > 3 ? ((98.8 + 18.8 * (member - 3)) * amount).toFixed(2) : (98.8 * amount).toFixed(2)
  } else {
    return (amount * checkout.product.unitPrice).toFixed(2)
  }
})

Vue.filter('date-filter', (timestamp) => {
  var format = (num) => num > 10 ? num : '0' + num
  let date = new Date(parseInt(timestamp))
  return date.getFullYear() + '/' + format(date.getMonth() + 1) + '/' + format(date.getDate()) + ' ' +
    (date.getHours() < 12 ? '上午' + date.getHours() : '下午' + (date.getHours() - 12)) +
    ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())
})

new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {App}
})
