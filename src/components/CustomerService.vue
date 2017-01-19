<template>
  <div id="customer-service">
    <div class="mask"
         v-bind:class="{active: !isHidden}"
         v-on:click="isHidden = !isHidden"></div>
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
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }
  .mask.active {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    transition: background-color 0.3s ease-in-out, z-index 0s;
  }

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
