<template>
  <div id="no-things">
    <slot id="image"></slot>
    <p id="message">{{ message }}</p>
    <mt-button type="primary"
               size="small"
               @click.native="jump"
               id="button"
               style="width: 77px;background-color: #DDDDDD;color: #555;">
      去逛逛
    </mt-button>
  </div>
</template>

<script>
  export default {
    props: {
      message: String
    },
    methods: {
      jump () {
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

  #message {
    font-size: 15px;
    line-height: 30px;
  }

  #button {
    display: block;
    margin: 10px auto;
  }
</style>
