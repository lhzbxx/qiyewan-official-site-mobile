<template>
  <div id="tabs-header">
    <p
      class="tab"
      v-bind:class="{ active: isCurrent(item) }"
      v-on:click="change(item)"
      v-for="item in tabs">
      {{ item }}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: null
      }
    },
    props: {
      tabs: Array
    },
    methods: {
      isCurrent(item) {
        return item == this.current
      },
      change(item) {
        this.current = item
        this.$emit('change-current', item)
      }
    },
    created() {
      this.current = this.tabs[0]
    }
  }
</script>

<style scoped>
  #tabs-header {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    background: white;
  }

  .tab {
    font-size: 15px;
    margin-right: 8px;
    padding: 8px 8px;
    border: 1px solid #eee;
  }

  .tab.active {
    color: #26a2ff;
    border-color: #26a2ff;
  }
</style>
