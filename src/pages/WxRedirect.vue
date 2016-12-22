<template>
  <div></div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('getOpenId', this.$route.params.code)
    }
  }
</script>
