<template>
  <div id="block-header" class="clearfix">
    <div id="block-header-title">
      <img src="../assets/mobile-icon-hot.png" alt="recommends">
      <span>{{ name }}</span>
    </div>
    <div id="block-header-more">
      <span>更多</span>
      <img src="../assets/mobile-icon-more.png" alt="more">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String
    }
  }
</script>

<style scoped>
  #block-header {
    background-color: white;
    margin: 10px 0;
    padding-top: 10px;
    height: 32px;
  }

  #block-header-title span {
    font-size: 16px;
  }

  #block-header-title {
    height: 100%;
    float: left;
    width: 50%;
  }

  #block-header-more {
    height: 100%;
    float: right;
    color: #aaa;
  }

  #block-header-more span {
    font-size: 13px
  }

  #block-header img {
    height: 100%;
    vertical-align: middle;
  }
</style>
