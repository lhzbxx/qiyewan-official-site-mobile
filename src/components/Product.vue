<template>
  <div id="product"
       v-on:click="jump">
    <img :src="cover | cdn-filter"
         :alt="name"
         v-bind:style="{ height: coverHeight + 'px' }"
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
    data () {
      return {}
    },
    props: {
      name: String,
      cover: String,
      price: Number,
      coverHeight: {
        type: Number,
        default: 100
      }
    },
    methods: {
      jump () {
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
    margin-bottom: 5px;
  }

  #product-cover {
    width: 100%;
  }

  #product-name {
    font-size: 12px;
    margin-top: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 14px;
  }

  #product-price {
    color: red;
    margin: 5px 0;
    font-size: 15px;
    line-height: 15px;
  }
</style>
