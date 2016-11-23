import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

import {Navbar, Tabbar, TabItem} from 'mint-ui';
import {Swipe, SwipeItem} from 'mint-ui';
import {TabContainer, TabContainerItem} from 'mint-ui';
import {Lazyload} from 'mint-ui';
import {Header} from 'mint-ui';
import {Button} from 'mint-ui';
import {Field} from 'mint-ui';
import {Cell, Radio} from 'mint-ui';

Vue.component(Navbar.name, Navbar);
Vue.component(Tabbar.name, Tabbar);
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
import PageHeader from './components/PageHeader.vue'
import ListHeader from './components/ListHeader.vue'
import Services from './components/Services.vue'
import CartDetail from './components/CartDetail.vue'

Vue.component('lh-table-header', TableHeader)
Vue.component('lh-table-entry', TableEntry)
Vue.component('lh-product', Product)
Vue.component('lh-block-header', BlockHeader)
Vue.component('lh-home-header', HomeHeader)
Vue.component('lh-page-header', PageHeader)
Vue.component('lh-list-header', ListHeader)
Vue.component('lh-services', Services)
Vue.component('lh-cart-detail', CartDetail)

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

function requireAuth(to, from, next) {
  if (!store.getters.isLogin) {
    store.commit("REQUIRE_LOGIN")
  } else {
    next()
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/order/:orderSerialId/product/:productSerialId/review',
    name: 'review',
    // beforeEnter: requireAuth,
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
  // {
  //   path: '/order',
  //   name: 'order',
  //   beforeEnter: requireAuth,
  //   component: OrderList
  // },
  {
    path: '/cart',
    name: 'cart',
    // beforeEnter: requireAuth,
    component: Carts
  },
  {
    path: '/pay',
    name: 'pay',
    // beforeEnter: requireAuth,
    component: Pay
  },
  {
    path: '/areas',
    name: 'areas',
    // beforeEnter: requireAuth,
    component: Areas
  },
  // {
  //   path: '/account',
  //   beforeEnter: requireAuth,
  //   component: AccountProfile
  // },
  // {
  //   path: '/person',
  //   beforeEnter: requireAuth,
  //   component: PersonalCenter
  // },
  // {
  //   path: '/news',
  //   component: NewsList
  // },
  // {
  //   path: '/about-us',
  //   component: AboutUs
  // },
  // {
  //   path: '/recruitment',
  //   component: Recruitment
  // },
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

new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {App}
})
