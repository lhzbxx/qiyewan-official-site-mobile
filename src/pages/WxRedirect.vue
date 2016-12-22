<template>
  <div></div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created () {
      let vm = this
      this.$store.dispatch('getOpenId', this.$route.query.code).then(
        () => {
          vm.$router.replace({name: 'home'})
        },
        () => {
          vm.$router.replace({name: 'home'})
        }
      )
    }
  }
</script>
