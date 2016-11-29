<template>
  <div id="not-found">
    <img src="../assets/404.png">
    <h1>哎呀，出错了</h1>
    <mt-button type="primary"
               size="small"
               @click.native="jump"
               id="button">
      回到首页
    </mt-button>
  </div>
</template>
<script>
  export default {
    methods: {
      jump() {
        this.$router.replace({name: 'home'})
      }
    }
  }
</script>

<style scoped>
  #not-found {
    margin-top: 80px;
    text-align: center;
  }

  #not-found img {
    width: 50%;
    display: block;
    margin: 0 auto;
  }

  h1 {
    margin-top: 20px;
    color: #aaa;
    font-size: 22px;
  }

  #button {
    display: block;
    margin: 20px auto;
  }
</style>
