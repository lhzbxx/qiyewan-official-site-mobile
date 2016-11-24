<template>
  <div id="app">
    <router-view class="child-view"></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedTab: 'tab-home'
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .clearfix:after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
  }
</style>
