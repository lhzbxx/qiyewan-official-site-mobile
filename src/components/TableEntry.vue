<template>
  <div id="table-entry"
       class="clearfix"
       v-on:click="jump">
    <img id="table-entry-cover"
         :src="cover | cdn-filter"
         :alt="name">
    <div id="table-entry-body"
         v-bind:class="{ 'no-border': !isSplit }">
      <p id="table-entry-name">{{ name }}</p>
      <p id="table-entry-summary">{{ summary }}</p>
      <p id="table-entry-price">
        <span>&yen;</span>
        {{ price.toFixed(2) }}
        <span v-if="amount && unit" style="color: #aaa; margin-left: 20px;">
          {{ amount }}&times;{{ unit }}
        </span>
      </p>
    </div>
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
      summary: String,
      price: Number,
      reviews: Number,
      rate: Number,
      amount: Number,
      unit: String,
      isSplit: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      jump() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>
  #table-entry {
    background: transparent;
    height: 90px;
  }

  #table-entry-body {
    float: left;
    width: 70%;
    padding-left: 8px;
    height: 90px;
    border-bottom: 1px solid #eee;
    margin-bottom: 8px;
    overflow: hidden;
  }

  #table-entry-body.no-border {
    border: none;
  }

  #table-entry-name {
    line-height: 25px;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #table-entry-summary {
    line-height: 15px;
    font-size: 13px;
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    min-height: 24px;
  }

  #table-entry-price {
    line-height: 38px;
  }

  #table-entry-cover {
    float: left;
    width: 30%;
    height: 80px;
  }

  #table-entry-price {
    color: red;
    font-size: 20px;
  }

  span {
    font-size: 13px;
  }
</style>
