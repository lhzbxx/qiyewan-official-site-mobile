<template>
  <div id="block-header" class="clearfix">
    <div id="block-header-title">
      <img src="../assets/hot.png" alt="recommends">
      <span>{{ name }}</span>
    </div>
    <div id="block-header-more"
         v-on:click="showMore">
      <span>更多</span>
      <img src="../assets/more.png" alt="more">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String
    },
    methods: {
      showMore () {
        this.$router.push({name: 'product-list'})
      }
    }
  }
</script>

<style scoped>
  #block-header {
    background-color: white;
    margin: 10px 0;
    padding-top: 10px;
    height: 32px;
    display: flex;
    align-items: center;
  }

  #block-header-title span {
    font-size: 16px;
  }

  #block-header-title {
    float: left;
    width: 50%;
  }

  #block-header-more {
    color: #aaa;
    margin-left: auto;
  }

  #block-header-more span {
    font-size: 13px
  }

  #block-header img {
    height: 20px;
    vertical-align: middle;
  }
</style>
