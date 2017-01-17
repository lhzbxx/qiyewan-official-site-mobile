<template>
  <div id="customer-service">
    <img v-on:click="isHidden = !isHidden"
         src="../assets/customer-service-main.png"
         style="bottom: 80px;">
    <a href="tel:400-716-8896">
      <img src="../assets/customer-service-phone.png"
           style="bottom: 125px;"
           v-bind:class="{hidden: isHidden}">
    </a>
    <img onclick="window.location.href='https://static.meiqia.com/dist/standalone.html?eid=39063'"
         src="../assets/customer-service-im.png"
         style="bottom: 170px;"
         v-bind:class="{hidden: isHidden}">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isHidden: true
      }
    }
  }
</script>

<style scoped>
  img {
    position: fixed;
    right: 10px;
    width: 55px;
    padding: 8px;
    transform: scale(1, 1);
    opacity: 1;
    z-index: 10;
    transition: all 0.2s ease-in-out;
  }

  img.hidden {
    opacity: 0;
    bottom: 80px !important;
    z-index: 0;
    transform: scale(0.6, 0.6);
  }
</style>
