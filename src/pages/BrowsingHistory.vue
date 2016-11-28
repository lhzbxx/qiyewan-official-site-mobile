<template>
  <div id="browsing-history">
    <lh-page-header title="浏览记录"></lh-page-header>
    <div v-if="getHistory.length == 0"></div>
    <div id="content"
         v-else>
      <lh-table-entry :name="item.name"
                      :cover="item.cover"
                      :summary="item.summary"
                      :price="item.unitPrice"
                      @click="jumpToDetail(item.serialId)"
                      v-for="item in getHistory">
      </lh-table-entry>
    </div>
    <p id="notify">（最多保存30条记录）</p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'getHistory'
      ])
    }
  }
</script>

<style scoped>
  #browsing-history {
    background: #f9f9f9;
    padding-top: 50px;
    min-height: 100%;
  }

  #content {
    background: white;
    padding: 15px 10px;
  }

  #notify {
    text-align: center;
    font-size: 16px;
    color: #aaa;
    line-height: 40px;
  }
</style>
