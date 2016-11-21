<template>
  <div id="areas">
    <label class="mint-radiolist-title">当前位置</label>
    <mt-cell
      :title="getRegion.name"
      :label="getRegion.pName"
      value="已选地区">
    </mt-cell>
    <label class="mint-radiolist-title">全部地区</label>
    <mt-cell
      :title="item.name"
      :label="item.pName"
      :value="isSelected(item) ? '已选地区' : ''"
      @click.native="selectRegion(item)"
      v-for="item in getRegions">
    </mt-cell>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'getRegions',
        'getRegion'
      ])
    },
    methods: {
      isSelected(region) {
        return region.code == this.getRegion.code
      },
      selectRegion(region) {
        this.$store.commit('CHANGE_REGION', region)
      }
    }
  }
</script>

<style scoped>

</style>
