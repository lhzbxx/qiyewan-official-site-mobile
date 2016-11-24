<template>
  <div id="order-header">
    <div id="serialId">订单编号：<p>{{ serialId }}</p></div>
    <div id="createAt">购买时间：<p>{{ createAt | date-filter }}</p></div>
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
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    background: white;
    justify-content: space-between;
  }

  #serialId {
    font-size: 14px;
    line-height: 14px;
  }

  #createAt {
    font-size: 12px;
    color: #aaa;
    line-height: 12px;
  }
</style>
