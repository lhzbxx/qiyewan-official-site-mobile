<template>
  <div></div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
      let state = this.$route.params.state
      console.log(state)
    }
  }
</script>
