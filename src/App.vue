<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!--<mt-tabbar v-model="selectedTab" :fixed="true">-->
      <!--<mt-tab-item id="tab-home">-->
        <!--<img slot="icon"-->
             <!--src="./assets/logo.png"-->
             <!--v-if="selectedTab === 'tab-home'">-->
        <!--<img slot="icon"-->
             <!--src="https://dfnjy7g2qaazm.cloudfront.net/v-582926ab/global/img/pattern/7.svg"-->
             <!--v-else>-->
        <!--首页-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="tab-orders">-->
        <!--<img slot="icon"-->
             <!--src="./assets/logo.png"-->
             <!--v-if="selectedTab === 'tab-orders'">-->
        <!--<img slot="icon"-->
             <!--src="https://dfnjy7g2qaazm.cloudfront.net/v-582926ab/global/img/pattern/7.svg"-->
             <!--v-else>-->
        <!--订单-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="tab-carts">-->
        <!--<img slot="icon"-->
             <!--src="./assets/logo.png"-->
             <!--v-if="selectedTab === 'tab-carts'">-->
        <!--<img slot="icon"-->
             <!--src="https://dfnjy7g2qaazm.cloudfront.net/v-582926ab/global/img/pattern/7.svg"-->
             <!--v-else>-->
        <!--购物车-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="tab-mine">-->
        <!--<img slot="icon"-->
             <!--src="./assets/logo.png"-->
             <!--v-if="selectedTab === 'tab-mine'">-->
        <!--<img slot="icon"-->
             <!--src="https://dfnjy7g2qaazm.cloudfront.net/v-582926ab/global/img/pattern/7.svg"-->
             <!--v-else>-->
        <!--我的-->
      <!--</mt-tab-item>-->
    <!--</mt-tabbar>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedTab: 'tab-home'
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #eee;
  }

  .clearfix:after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
  }
</style>
