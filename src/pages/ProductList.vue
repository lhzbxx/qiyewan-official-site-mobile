<template>
  <div id="product-list">
    <lh-page-header title="产品列表"></lh-page-header>
    <lh-loading v-if="isLoading"></lh-loading>
    <div id="wrapper"
         v-else>
      <div id="lists">
        <div class="list"
             v-bind:class="{active: isCurrent(item.code)}"
             v-for="item in classifications"
             v-on:click="switchClassification(item)">
          <div class="classification-icon"
               v-bind:class="[item.code, {active: isCurrent(item.code)}]"
               :alt="item.name"></div>
          {{ item.name }}
        </div>
      </div>
      <div id="content">
        <div class="classification" v-for="(item, index) in list">
          <div class="content-header">
            <div class="splitter"></div>
            <div class="classification-name">{{ currentClassification.subs[index] }}</div>
          </div>
          <div class="content-body">
            <div v-for="i in item"
                 v-on:click="jumpToDetail(i.serialId)"
                 class="product">
              {{ i.name }}
            </div>
          </div>
        </div>
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
        classifications: [
          {
            name: '工商服务',
            code: 'IC',
            subs: [
              '工商变更',
              '工商注销'
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
            name: '法律服务',
            code: 'LD',
            subs: [
              '法律服务',
              '知识产权'
            ]
          },
          {
            name: '人事服务',
            code: 'HR',
            subs: [
              '企业',
              '个人'
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
        currentClassification: {
          name: '工商服务',
          code: 'IC',
          subs: [
            '工商变更',
            '工商注销'
          ]
        },
        lists: []
      }
    },
    methods: {
      isCurrent (code) {
        return code === this.currentClassification.code
      },
      switchClassification (classification) {
        this.$router.replace({name: 'product-list', query: {code: classification.code}})
      },
      jumpToDetail (serialId) {
        this.$router.push({name: 'product-detail', params: {serialId: serialId}})
      },
      init () {
        let index = this.classifications.findIndex(item => item.code === this.$route.query.code)
        this.currentClassification = this.classifications[(index > -1 ? index : 0)]
      }
    },
    computed: {
      list () {
        let list = this.lists.filter(item => item.classificationCode === this.currentClassification.code)
        var result = []
        for (let i of this.currentClassification.subs) {
          result.push(list.filter(item => item.classificationName === i))
        }
        return result
      }
    },
    watch: {
      '$route.query.code': 'init'
    },
    created () {
      this.init()
      let vm = this
      this.$store.dispatch('getProducts').then(
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
  #product-list {
    padding-top: 44px;
    min-height: 100%;
  }

  #wrapper {
    display: flex;
    min-height: 100%;
    position: absolute;
    margin-top: -44px;
    padding-top: 44px;
  }

  #lists {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 77px;
    max-width: 77px;
    background-color: #F8F8F8;
    margin-right: 1px;
  }

  .list {
    width: 70px;
    text-align: center;
    border-bottom: 1px solid #ededed;
    color: #666;
    font-size: 14px;
    padding-bottom: 22px;
    margin-top: 5px;
  }

  .list.active {
    color: #199cd8;
    border-bottom: 3px solid #199cd8;
    margin-bottom: -2px;
  }

  .classification {
    margin-top: 6px;
  }

  .classification-icon {
    margin: 15px auto 8px;
    text-align: center;
    display: block;
    background: no-repeat center;
    background-size: 100%;
  }

  #content {
    flex-grow: 1;
    padding-bottom: 2px;
  }

  .content-header {
    display: flex;
    padding: 0 10px;
    height: 30px;
    align-items: center;
    color: #666;
  }

  .splitter {
    background-color: #1994F3;
    width: 4px;
    height: 15px;
    margin-right: 5px;
  }

  .classification-name {
    font-size: 16px;
  }

  .content-body {
    display: flex;
    align-items: center;
    background: white;
    flex-wrap: wrap;
    padding: 0 10px 10px;
  }

  .product {
    border: 1px solid #ddd;
    padding: 5px;
    font-size: 13px;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-right: 10px;
    line-height: 15px;
    color: #666;
  }

  /*.HR {*/
    /*background-image: url("../assets/HR.png");*/
  /*}*/

  /*.HR.active {*/
    /*background-image: url("../assets/HR-active.png");*/
  /*}*/

  /*.FC {*/
    /*background-image: url("../assets/FC.png");*/
    /*background-size: 70%;*/
  /*}*/

  /*.FC.active {*/
    /*background-image: url("../assets/FC-active.png");*/
  /*}*/

  /*.IC {*/
    /*background-image: url("../assets/IC.png");*/
  /*}*/

  /*.IC.active {*/
    /*background-image: url("../assets/IC-active.png");*/
  /*}*/

  /*.LD {*/
    /*background-image: url("../assets/LD.png");*/
  /*}*/

  /*.LD.active {*/
    /*background-image: url("../assets/LD-active.png");*/
  /*}*/

  /*.IT {*/
    /*background-image: url("../assets/IT.png");*/
  /*}*/

  /*.IT.active {*/
    /*background-image: url("../assets/IT-active.png");*/
  /*}*/
</style>
