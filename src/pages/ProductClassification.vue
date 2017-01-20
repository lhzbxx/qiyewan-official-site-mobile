<template>
  <div id="product-classification">
    <lh-page-header :title="currentClassification.name"></lh-page-header>
    <lh-tabs-header :tabs="currentClassification.subs"
                    :tab="currentClassificationName"
                    @change-current="changeCurrent"></lh-tabs-header>
    <lh-loading v-if="isLoading"></lh-loading>
    <div v-else>
      <lh-list-header :title="currentClassificationName"
                      :amount="list.length"></lh-list-header>
      <div style="padding: 0 10px;">
        <lh-table-entry :name="item.name"
                        :cover="item.cover"
                        :summary="item.summary"
                        :price="item.price"
                        @click="jumpToDetail(item.serialId)"
                        v-for="item in list">
        </lh-table-entry>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isLoading: true,
        error: null,
        currentClassification: null,
        currentClassificationName: null,
        classifications: [
          {
            name: '人力资源服务',
            code: 'HR',
            subs: [
              '企业',
              '个人'
            ]
          },
          {
            name: '财税服务',
            code: 'FC',
            subs: [
              '财务服务',
              '税务服务'
            ]
          },
          {
            name: '工商服务',
            code: 'IC',
            subs: [
              '工商变更',
              '工商注销'
            ]
          },
          {
            name: '法律服务',
            code: 'LD',
            subs: [
              '法律服务',
              '知识产权'
            ]
          },
          {
            name: 'IT&设计',
            code: 'IT',
            subs: [
              '网站设计',
              'LOGO设计'
            ]
          }
        ],
        lists: []
      }
    },
    methods: {
      jumpToDetail (serialId) {
        this.$router.push({name: 'product-detail', params: {serialId: serialId}})
      },
      changeCurrent (current) {
        this.currentClassificationName = current
      }
    },
    computed: {
      list () {
        return this.lists.filter(item => item.classificationName === this.currentClassificationName)
      }
    },
    created () {
      let classification = this.$route.params.classificationCode
      let index = this.classifications.findIndex(
        item => item.code === classification)
//      @polyfill
//      var index = -1
//      this.classifications.forEach((item, i) =>
//        item.code === classification ? (index = i) : -1
//      )
      if (index < 0) {
        this.$router.replace({name: 'not-found'})
      } else {
        this.currentClassification = this.classifications[index]
        this.currentClassificationName = this.currentClassification.subs[0]
      }
      let vm = this
      this.$store.dispatch('getProductList', classification).then(
        data => {
          vm.lists = data
          vm.isLoading = false
        },
        error => {
          vm.error = error
        }
      )
    }
  }
</script>

<style scoped>
  #product-classification {
    padding-top: 44px;
    min-height: 100%;
  }
</style>
