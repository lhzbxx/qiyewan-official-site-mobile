<template>
  <div id="customer-service">
    <img v-on:click="isHidden = !isHidden"
         src="../assets/customer-service-main.png"
         style="bottom: 80px;">
    <a href="tel:400-716-8896">
      <img v-show="!isHidden"
           src="../assets/customer-service-phone.png"
           style="bottom: 125px;">
    </a>
    <img v-show="!isHidden"
         onclick="window.location.href='https://static.meiqia.com/dist/standalone.html?eid=39063'"
         src="../assets/customer-service-im.png"
         style="bottom: 170px;">
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
  }
</style>
