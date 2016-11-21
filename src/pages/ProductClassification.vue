<template>
  <div id="product-classification">
    <lh-page-header :title="currentClassification.name"></lh-page-header>
    <div id="tabs">
      <p
        class="tab"
        v-bind:class="{ active: isCurrent(item) }"
        v-on:click="switchClassification(item)"
        v-for="item in currentClassification.subs">
        {{ item }}
      </p>
    </div>
    <lh-list-header :title="currentClassificationName"
                    :amount="list.length"></lh-list-header>
    <lh-table-entry :name="item.name"
                    :cover="item.cover"
                    :summary="item.summary"
                    :price="item.price"
                    @click="jumpToDetail(item.serialId)"
                    v-for="item in list"></lh-table-entry>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentClassification: null,
        currentClassificationName: null,
        classifications: [
          {
            name: '人事服务',
            code: 'HR',
            subs: [
              '社保',
              '公司人事'
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
//        lists: []
        lists: [{
          "name": "公司注册(园区)",
          "serialId": "SHSHIC0001",
          "cover": "product-SHSHIC0001-cover.jpg",
          "summary": "代理注册（使用企业湾提供地址注册） 至拿到营业执照和三章",
          "price": 400.0,
          "classificationName": "工商变更"
        }, {
          "name": "公司注册(非园区)",
          "serialId": "SHSHIC0002",
          "cover": "product-SHSHIC0002-cover.jpg",
          "summary": "代理注册（客户自己提供注册地址） 至拿到营业执照和三章",
          "price": 1200.0,
          "classificationName": "工商变更"
        }, {
          "name": "1元公司注册(园区)+零申报代理记账(1年)",
          "serialId": "SHSHIC0003",
          "cover": "product-SHSHIC0003-cover.jpg",
          "summary": "注册公司一元免费代理（使用企业湾提供地址） 但必须签约代账合同 1 年及以上。到拿到一证三章",
          "price": 1177.0,
          "classificationName": "工商变更"
        }, {
          "name": "公司名称变更",
          "serialId": "SHSHIC0004",
          "cover": "product-SHSHIC0004-cover.jpg",
          "summary": "办理工商变更",
          "price": 800.0,
          "classificationName": "工商变更"
        }, {
          "name": "经营范围变更",
          "serialId": "SHSHIC0005",
          "cover": "product-SHSHIC0005-cover.jpg",
          "summary": "办理工商变更",
          "price": 800.0,
          "classificationName": "工商变更"
        }, {
          "name": "法人代表变更",
          "serialId": "SHSHIC0006",
          "cover": "product-SHSHIC0006-cover.jpg",
          "summary": "办理工商变更",
          "price": 800.0,
          "classificationName": "工商变更"
        }, {
          "name": "经营地址变更(不跨区)",
          "serialId": "SHSHIC0007",
          "cover": "product-SHSHIC0007-cover.jpg",
          "summary": "办理工商变更 不包括税务迁移或变更",
          "price": 800.0,
          "classificationName": "工商变更"
        }, {
          "name": "经营地址变更(跨区)",
          "serialId": "SHSHIC0008",
          "cover": "product-SHSHIC0008-cover.jpg",
          "summary": "办理工商变更 不包括税务迁移或变更",
          "price": 3000.0,
          "classificationName": "工商变更"
        }, {
          "name": "注册资本变更",
          "serialId": "SHSHIC0009",
          "cover": "product-SHSHIC0009-cover.jpg",
          "summary": "办理工商变更 不包括注册资本减资服务",
          "price": 800.0,
          "classificationName": "工商变更"
        }, {
          "name": "股东 股权变更",
          "serialId": "SHSHIC0010",
          "cover": "product-SHSHIC0010-cover.jpg",
          "summary": "办理工商变更 不包括股权转让协议撰写",
          "price": 800.0,
          "classificationName": "工商变更"
        }, {
          "name": "公司高管变更",
          "serialId": "SHSHIC0011",
          "cover": "product-SHSHIC0011-cover.jpg",
          "summary": "办理工商变更",
          "price": 800.0,
          "classificationName": "工商变更"
        }, {
          "name": "三证/五证合一",
          "serialId": "SHSHIC0012",
          "cover": "product-SHSHIC0012-cover.jpg",
          "summary": "办理营业执照、税务登记证、组织机构代码证三证合一服务",
          "price": 400.0,
          "classificationName": "工商变更"
        }, {
          "name": "内资企业注销",
          "serialId": "SHSHIC0013",
          "cover": "product-SHSHIC0013-cover.jpg",
          "summary": "办理工商税务等行政机关注销事项 本服务收费不包括专项审计及官费",
          "price": 5000.0,
          "classificationName": "工商注销"
        }, {
          "name": "1元补差产品",
          "serialId": "SHSHIC0014",
          "cover": "product-SHSHIC0014-cover.jpg",
          "summary": "服务差价补充产品",
          "price": 1.0,
          "classificationName": "工商注销"
        }]
      }
    },
    methods: {
      init() {
        let index = this.classifications.findIndex(
          item => item.code == this.$route.params.classificationCode)
        if (index < 0) {
          this.$router.replace({name: 'not-found'})
        } else {
          this.currentClassification = this.classifications[index]
          this.currentClassificationName = this.currentClassification.subs[0]
        }
      },
      isCurrent(name) {
        return name == this.currentClassificationName
      },
      switchClassification(name) {
        this.currentClassificationName = name
      },
      jumpToDetail(serialId) {
        this.$router.push({name: 'product-detail', params: {serialId: serialId}})
      }
    },
    computed: {
      list() {
        return this.lists.filter(item => item.classificationName == this.currentClassificationName)
      }
    },
    created() {
      this.init()
//      todo: 对接API。
    }
  }
</script>

<style scoped>
  #product-classification {
    margin-top: 50px;
  }

  #tabs {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
  }

  .tab {
    font-size: 16px;
    margin-right: 10px;
    padding: 8px 10px;
    border: 1px solid #eee;
  }

  .tab.active {
    color: #26a2ff;
    border-color: #26a2ff;
  }
</style>
