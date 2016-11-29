<template>
  <div id="app">
    <router-view id="child-view"></router-view>
  </div>
</template>

<style>
  #app {
    height: 100%;
  }

  #child-view {
    width: 100%;
    min-height: 100%;
    background: white;
    overflow: hidden;
  }

  .clearfix:after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
  }
</style>
