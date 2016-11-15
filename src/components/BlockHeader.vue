<template>
  <div id="block-header">
    <div class="block-header">
      <img src="../assets/mobile-icon-hot.png" alt="recommends">
      {{ name }}
      <span id="block-header-more">
          更多
          <img src="../assets/mobile-icon-more.png" alt="more">
        </span>
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
    margin: 5px 0;
    padding: 0 10px;
  }

  #block-header-more {
    float: right;
    color: #aaa;
  }

  #block-header img {
    height: 100%;
  }
</style>
