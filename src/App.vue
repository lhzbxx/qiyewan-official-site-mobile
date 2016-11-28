<template>
  <div id="app">
    <router-view class="child-view"></router-view>
  </div>
</template>

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
