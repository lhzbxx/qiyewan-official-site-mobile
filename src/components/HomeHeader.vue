<template>
  <div id="header">
    <img src="" alt="≡" id="menu">
    <img src="http://cdn.qiyewan.com/logo.png"
         alt="logo"
         id="logo">
    <div v-on:click="jumpToAreas">上海</div>
  </div>
</template>

<script>
  export default {
    methods: {
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
  }

  #menu {
    height: 36px;
  }

  #logo {
    height: 36px;
  }
</style>
