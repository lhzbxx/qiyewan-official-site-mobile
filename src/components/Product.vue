<template>
  <div id="product"
       v-on:click="jump">
    <img :src="cover"
         :alt="name"
         id="product-cover">
    <p id="product-name">
      {{ name }}
    </p>
    <p id="product-price">
      &yen;{{ price.toFixed(2) }}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      name: String,
      cover: String,
      price: Number,
    },
    methods: {
      jump() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>
  #product {
    float: left;
    background: white;
    padding: 0 5px;
  }

  #product-cover {
    width: 100%;
    height:100px;
  }

  #product-name {
    font-size: 12px;
    margin-top: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  #product-price {
    color: red;
    margin: 5px 0;
  }
</style>
