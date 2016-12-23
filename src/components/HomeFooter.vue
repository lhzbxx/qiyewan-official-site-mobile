<template>
  <div id="home-footer">
    <div class="tab" v-on:click="jump(1)">
      <!--todo: 替换icon！-->
      <img v-if="index == 1" src="../assets/tab-home-active.png">
      <img v-else src="../assets/tab-home.png">
      <p v-bind:class="{active: index == 1}">首页</p>
    </div>
    <div class="tab" v-on:click="jump(2)">
      <img v-if="index == 2" src="../assets/tab-order-active.png">
      <img v-else src="../assets/tab-order.png">
      <p v-bind:class="{active: index == 2}">订单</p>
    </div>
    <div class="tab" v-on:click="jump(3)">
      <img v-if="index == 3" src="../assets/tab-cart-active.png">
      <img v-else src="../assets/tab-cart.png">
      <p v-bind:class="{active: index == 3}">购物车</p>
    </div>
    <div class="tab" v-on:click="jump(4)">
      <img v-if="index == 4" src="../assets/tab-mine-active.png">
      <img v-else src="../assets/tab-mine.png">
      <p v-bind:class="{active: index == 4}">我的</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        default: 1
      }
    },
    methods: {
      jump (index) {
        switch (index) {
          case 1:
            this.$router.replace({name: 'home'})
            break
          case 2:
            this.$router.replace({name: 'order'})
            break
          case 3:
            this.$router.replace({name: 'cart'})
            break
          case 4:
            this.$router.replace({name: 'mine'})
            break
        }
      }
    }
  }
</script>

<style scoped>
  #home-footer {
    height: 44px;
    position: fixed;
    display: flex;
    bottom: 0;
    align-items: center;
    width: 100%;
    background: #fefefe;
    border-top: 1px solid #eee;
    z-index: 100;
  }

  .tab {
    flex: 1;
    text-align: center;
    height: 100%;
    padding-top: 6px;
    padding-bottom: 4px;
  }

  .tab img {
    height: 18px;
  }

  .tab p {
    font-size: 10px;
    line-height: 10px;
  }

  p.active {
    color: #26a2ff;
  }
</style>
