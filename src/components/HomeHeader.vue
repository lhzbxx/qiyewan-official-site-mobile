<template>
  <div id="header">
    <div id="menu">
      <img src=""
           alt="≡"
           v-on:click="jumpToList">
    </div>
    <img src="http://cdn.qiyewan.com/logo.png"
         alt="logo"
         id="logo">
    <div id="area"
         v-on:click="jumpToAreas">
      上海
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      jumpToList() {
        this.$router.push({name: 'product-list'})
      },
      jumpToAreas() {
        this.$router.push({name: 'areas'})
      }
    }
  }
</script>

<style scoped>
  #header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-shadow: 0 0 10px #aaa;
    position: fixed;
    width: 100%;
    background: white;
    top: 0;
    z-index: 100;
  }

  #menu {
    width: 70px;
  }

  #logo {
    height: 36px;
  }

  #area {
    width: 70px;
    text-align: right;
  }
</style>
