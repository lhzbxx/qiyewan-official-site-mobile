<template>
  <div id="browsing-history">
    <lh-page-header title="浏览记录"></lh-page-header>
    <lh-table-entry :name="item.name"
                    :cover="item.cover"
                    :summary="item.summary"
                    :price="item.price"
                    @click="jumpToDetail(item.serialId)"
                    v-for="item in getHistory">
    </lh-table-entry>
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
