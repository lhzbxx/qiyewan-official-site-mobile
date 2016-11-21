<template>
  <div id="header">
    <div id="back">
      <!--todo: 添加icon！-->
      <img src="" alt="back" v-on:click="back">
    </div>
    <span id="title">{{ title }}</span>
    <div id="more">
      <!--todo: 添加icon！-->
      <img src="" alt="more" style="float: right;" v-if="hasMore">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      hasMore: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
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
    box-shadow: 0 0 10px #aaa;
    padding: 0 10px;
    position: relative;
  }

  #back {
    width: 100px;
  }

  #title {
    flex-grow: 1;
    text-align: center;
    font-size: 18px;
  }

  #more {
    width: 100px;
  }
</style>
