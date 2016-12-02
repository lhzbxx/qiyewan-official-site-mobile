<template>
  <div id="raters">
    <div class="rater"
         v-bind:class="{active: item <= rate}"
         v-on:click="rate = item"
         v-for="item in 5">★
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      rate: Number
    }
  }
</script>

<style scoped>
  #raters {
    text-align: center;
    flex: 1;
    flex-shrink: 0;
  }

  .rater {
    color: rgb(204, 204, 204);;
    margin-right: 2px;
    font-size: 25px;
    width: 25px;
    height: 25px;
    line-height: 25px;
    display: inline-block;
    position: relative;
  }

  .rater.active {
    color: rgb(255, 204, 102);
  }
</style>
