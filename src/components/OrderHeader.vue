<template>
  <div id="order-header">
    <div id="serialId">订单编号：{{ serialId }}</div>
    <div id="createAt">购买时间：{{ createAt | date-filter }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      serialId: String,
      createAt: Number
    }
  }
</script>

<style scoped>
  #order-header {
    height: 55px;
    padding: 5px 10px;
    border-bottom: 1px solid #eee;
    background: white;
    margin-bottom: 10px;
  }

  #serialId {
    margin-top: 5px;
    font-size: 13px;
    line-height: 20px;
  }

  #createAt {
    font-size: 12px;
    color: #aaa;
    line-height: 15px;
    margin-top: 4px;
  }
</style>
