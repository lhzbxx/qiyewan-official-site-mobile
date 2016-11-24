<template>
  <div id="no-things">
    <img src="../assets/logo.png" alt="暂无">
    <mt-button type="primary"
               size="small"
               @click.native="jump"
               id="button">
      去逛逛
    </mt-button>
  </div>
</template>

<script>
  export default {
    methods: {
      jump() {
        this.$router.push({name: 'product-list'})
      }
    }
  }
</script>

<style scoped>
  #no-things {
    margin: 80px auto 0;
    text-align: center;
  }

  #no-carts img {
    width: 50%;
  }

  #button {
    display: block;
    margin: 20px auto;
  }
</style>
