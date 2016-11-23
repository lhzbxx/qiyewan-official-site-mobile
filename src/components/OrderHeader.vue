<template>
  <div id="order-header">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: null
      }
    },
    props: {
      order: Array
    }
  }
</script>

<style scoped>
  #order-header {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    background: white;
  }
</style>
