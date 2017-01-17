import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import * as filters from './filters'

Vue.use(VueResource)
Vue.http.options.root = process.env.API

import {
  Navbar, TabItem, Swipe, TabContainer, Lazyload, Header, Button, Field, Cell, SwipeItem, TabContainerItem, Radio
} from 'mint-ui'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.use(Lazyload)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Cell.name, Cell)
Vue.component(Radio.name, Radio)

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
import CustomerService from './components/CustomerService.vue'

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
Vue.component('lh-customer-service', CustomerService)

import App from './App'

store.dispatch('init')

Vue.filter('cdn-filter', filters.cdnPrefix)
Vue.filter('sub-total-price-filter', filters.totalPrice)
Vue.filter('date-filter', filters.dateFormat)
Vue.filter('region-filter', filters.regionFormat)
Vue.filter('time-filter', filters.timeFormat)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {App}
})
