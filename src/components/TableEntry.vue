<template>
  <div id="table-entry" class="clearfix">
    <img id="table-entry-cover"
         :src="cover"
         :alt="name">
    <div id="table-entry-body">
      <p id="table-entry-name">{{ name }}</p>
      <p id="table-entry-summary">{{ summary }}</p>
      <p id="table-entry-price">
        <span>&yen;</span>
        {{ price.toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      name: String,
      cover: String,
      summary: String,
      price: Number,
      reviews: Number,
      rate: Number
    }
  }
</script>

<style scoped>
  #table-entry {
    background: white;
    padding: 0 10px;
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

  #table-entry-name {
    line-height: 25px;
    font-size: 15px;
  }

  #table-entry-summary {
    line-height: 15px;
    font-size: 13px;
    color: #aaa;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
