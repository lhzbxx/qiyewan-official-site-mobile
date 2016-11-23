<template>
  <div id="orders">
    <lh-page-header title="购物车"></lh-page-header>
    <lh-home-footer :index="2"></lh-home-footer>
    <lh-tabs-header :tabs="orderState"
                    @change-current="changeCurrent"></lh-tabs-header>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderState: [
          '未付款',
          '待评价',
          '已完成'
        ]
      }
    },
    methods: {
      changeCurrent(current) {

      }
    }
  }
</script>

<style scoped>
  #orders {
    padding-top: 50px;
    padding-bottom: 50px;
    background: #fafafa;
    height: 100%;
  }
</style>
