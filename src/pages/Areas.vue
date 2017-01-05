<template>
  <transition name="slide-right">
    <div id="areas">
      <lh-page-header title="选择地区"></lh-page-header>
      <label class="mint-radiolist-title">当前位置</label>
      <div>
        <mt-cell
          :title="getRegion.name"
          :label="getRegion.pName"
          value="已选地区">
        </mt-cell>
      </div>
      <label class="mint-radiolist-title">全部地区</label>
      <div>
        <mt-cell
          :title="item.name"
          :label="item.pName"
          :value="isSelected(item) ? '已选地区' : ''"
          @click.native="selectRegion(index)"
          v-for="(item, index) in getRegions">
        </mt-cell>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'getRegions',
        'getRegion'
      ])
    },
    methods: {
      isSelected (region) {
        return region.code === this.getRegion.code
      },
      selectRegion (regionIndex) {
        this.$store.commit('CHANGE_REGION', regionIndex)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  #areas {
    padding-top: 44px;
    min-height: 100%;
    background: #f9f9f9;
  }
</style>
