<template>
  <div id="home-footer">
    <div class="tab" v-on:click="jump(1)">
      <!--todo: 替换icon！-->
      <img v-if="index == 1" src="../assets/logo.png">
      <img v-else src="../assets/mobile-icon-hot.png">
      <p>首页</p>
    </div>
    <div class="tab" v-on:click="jump(2)">
      <img v-if="index == 2" src="../assets/logo.png">
      <img v-else src="../assets/mobile-icon-hot.png">
      <p>订单</p>
    </div>
    <div class="tab" v-on:click="jump(3)">
      <img v-if="index == 3" src="../assets/logo.png">
      <img v-else src="../assets/mobile-icon-hot.png">
      <p>购物车</p>
    </div>
    <div class="tab" v-on:click="jump(4)">
      <img v-if="index == 4" src="../assets/logo.png">
      <img v-else src="../assets/mobile-icon-hot.png">
      <p>我的</p>
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
      jump(index) {
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
    height: 50px;
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
    padding: 5px 0;
  }

  .tab img {
    height: 25px;
  }

  .tab p {
    font-size: 13px;
    line-height: 15px;
  }
</style>
