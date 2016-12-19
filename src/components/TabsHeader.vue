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
    data () {
      return {
        current: null
      }
    },
    props: {
      tabs: Array,
      tab: String
    },
    methods: {
      isCurrent (item) {
        return item === this.current
      },
      change (item) {
        this.current = item
        this.$emit('change-current', item)
      }
    },
    created () {
      this.current = this.tab
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
    border: 1px solid #eee;
    height: 34px;
    line-height: 32px;
    padding: 0 8px;
  }

  .tab.active {
    color: #26a2ff;
    border-color: #26a2ff;
  }
</style>
