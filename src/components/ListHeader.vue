<template>
  <div id="list-header">
    <p id="title">
      {{ title }}
    </p>
    <p>
      共计
      <span id="amount">{{ amount }}</span>
      个服务
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      amount: Number
    }
  }
</script>

<style scoped>
  #list-header {
    height: 40px;
    padding: 0 10px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  #title {
    border-left: 3px solid #26a2ff;
    line-height: 22px;
    font-size: 16px;
    padding-left: 10px;
  }

  #amount {
    color: red;
    font-weight: 700;
    font-family: arial, serif;
  }
</style>
