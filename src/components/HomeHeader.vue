<template>
  <div id="home-header">
    <div id="menu">
      <img src="../assets/menu.png"
           alt="≡"
           v-on:click="jumpToList()">
    </div>
    <img src="http://cdn.qiyewan.com/logo.png"
         alt="logo"
         id="logo">
    <div id="area"
         v-on:click="jumpToAreas()">
      {{ getRegion.name }}
      <img src="../assets/down.png"
           width=12
           style="vertical-align: middle">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'getRegion'
      ])
    },
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
  #home-header {
    height: 44px;
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

  #menu img {
    height: 20px;
  }

  #logo {
    height: 36px;
  }

  #area {
    width: 70px;
    text-align: right;
  }
</style>
