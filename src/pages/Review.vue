<template>
  <div id="review">
    <lh-page-header title="评论"></lh-page-header>
    <div id="wrapper">
      <mt-button type="primary"
                 id="submitButton"
                 size="large">
        提 交
      </mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        review: {}
      }
    }
  }
</script>

<style scoped>
  #review {
    margin-top: 50px;
  }

  #wrapper {
    padding: 0 10px;
  }

  #submitButton {
    margin-top: 20px;
  }
</style>
