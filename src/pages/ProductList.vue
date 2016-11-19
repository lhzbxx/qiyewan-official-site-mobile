<template>
  <div id="product-list">
    <div id="lists">
      <div class="list"
           v-bind:class="{ active: isCurrent(item.code) }"
           v-for="item in classifications"
           v-on:click="switchClassification(item.code)">
        <img :src="item.icon" :alt="item.name">
        {{ item.name }}
      </div>
    </div>
    <div id="content">
      <div class="classification" v-for="(item, index) in list">
        <div class="content-header">
          <div class="dot">&#8226;</div>
          <div>{{ currentClassification.subs[index] }}</div>
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
</template>

<script>
  export default {
    data() {
      return {
        currentClassification: null,
        classifications: [
          {
            name: '人事服务',
            code: 'HR',
//            todo: 需要替换icon！
            icon: '',
            subs: [
              '社保',
              '公司人事'
            ]
          },
          {
            name: '财税服务',
            code: 'FC',
            icon: '',
            subs: [
              '财务服务',
              '税务服务'
            ]
          },
          {
            name: '工商服务',
            code: 'IC',
            icon: '',
            subs: [
              '工商变更',
              '工商注销'
            ]
          },
          {
            name: '法律服务',
            code: 'LD',
            icon: '',
            subs: [
              '法律服务',
              '知识产权'
            ]
          },
          {
            name: 'IT&设计',
            code: 'IT',
            icon: '',
            subs: [
              '网站设计',
              'LOGO设计'
            ]
          }
        ],
        lists: [{
          "name": "注册财税一条龙",
          "serialId": "SHSHPS0001",
          "classificationName": "套餐",
          "classificationCode": "PS"
        }, {
          "name": "法财宝",
          "serialId": "SHSHPS0002",
          "classificationName": "套餐",
          "classificationCode": "PS"
        }, {
          "name": "商标宝",
          "serialId": "SHSHPS0003",
          "classificationName": "套餐",
          "classificationCode": "PS"
        }, {
          "name": "人事宝",
          "serialId": "SHSHPS0004",
          "classificationName": "套餐",
          "classificationCode": "PS"
        }, {
          "name": "公司注册(园区)",
          "serialId": "SHSHIC0001",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "公司注册(非园区)",
          "serialId": "SHSHIC0002",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "1元公司注册(园区)+零申报代理记账(1年)",
          "serialId": "SHSHIC0003",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "公司名称变更",
          "serialId": "SHSHIC0004",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "经营范围变更",
          "serialId": "SHSHIC0005",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "法人代表变更",
          "serialId": "SHSHIC0006",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "经营地址变更(不跨区)",
          "serialId": "SHSHIC0007",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "经营地址变更(跨区)",
          "serialId": "SHSHIC0008",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "注册资本变更",
          "serialId": "SHSHIC0009",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "股东 股权变更",
          "serialId": "SHSHIC0010",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "公司高管变更",
          "serialId": "SHSHIC0011",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "三证/五证合一",
          "serialId": "SHSHIC0012",
          "classificationName": "工商变更",
          "classificationCode": "IC"
        }, {
          "name": "内资企业注销",
          "serialId": "SHSHIC0013",
          "classificationName": "工商注销",
          "classificationCode": "IC"
        }, {
          "name": "1元补差产品",
          "serialId": "SHSHIC0014",
          "classificationName": "工商注销",
          "classificationCode": "IC"
        }, {
          "name": "零申报代理记账",
          "serialId": "SHSHFC0001",
          "classificationName": "财务服务",
          "classificationCode": "FC"
        }, {
          "name": "小规模纳税人代理记账",
          "serialId": "SHSHFC0002",
          "classificationName": "财务服务",
          "classificationCode": "FC"
        }, {
          "name": "一般纳税人代理记账",
          "serialId": "SHSHFC0003",
          "classificationName": "财务服务",
          "classificationCode": "FC"
        }, {
          "name": "企业基本户开户",
          "serialId": "SHSHFC0004",
          "classificationName": "财务服务",
          "classificationCode": "FC"
        }, {
          "name": "企业一般户开户",
          "serialId": "SHSHFC0005",
          "classificationName": "财务服务",
          "classificationCode": "FC"
        }, {
          "name": "税务报道 税种认定",
          "serialId": "SHSHFC0006",
          "classificationName": "税务服务",
          "classificationCode": "FC"
        }, {
          "name": "代领CA证书",
          "serialId": "SHSHFC0007",
          "classificationName": "税务服务",
          "classificationCode": "FC"
        }, {
          "name": "一般纳税人认定",
          "serialId": "SHSHFC0008",
          "classificationName": "税务服务",
          "classificationCode": "FC"
        }, {
          "name": "税务登记信息变更",
          "serialId": "SHSHFC0009",
          "classificationName": "税务服务",
          "classificationCode": "FC"
        }, {
          "name": "代开发票服务",
          "serialId": "SHSHFC0010",
          "classificationName": "税务服务",
          "classificationCode": "FC"
        }, {
          "name": "合同撰写与审查（普通）",
          "serialId": "SHSHLD0001",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "合同撰写与审查（定制）",
          "serialId": "SHSHLD0002",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "公司章程",
          "serialId": "SHSHLD0003",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "股东 合伙协议",
          "serialId": "SHSHLD0004",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "股权激励协议",
          "serialId": "SHSHLD0005",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "法律咨询",
          "serialId": "SHSHLD0006",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "法律咨询(包月)",
          "serialId": "SHSHLD0007",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "法律包服务(三个月)",
          "serialId": "SHSHLD0008",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "法律包服务(半年)",
          "serialId": "SHSHLD0009",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "法律包服务(一年)",
          "serialId": "SHSHLD0010",
          "classificationName": "法律服务",
          "classificationCode": "LD"
        }, {
          "name": "实用新型专利申请",
          "serialId": "SHSHLD0011",
          "classificationName": "知识产权",
          "classificationCode": "LD"
        }, {
          "name": "发明专利申请",
          "serialId": "SHSHLD0012",
          "classificationName": "知识产权",
          "classificationCode": "LD"
        }, {
          "name": "商标注册",
          "serialId": "SHSHLD0013",
          "classificationName": "知识产权",
          "classificationCode": "LD"
        }, {
          "name": "计算机软件著作权",
          "serialId": "SHSHLD0014",
          "classificationName": "知识产权",
          "classificationCode": "LD"
        }, {
          "name": "文字或美术著作权",
          "serialId": "SHSHLD0015",
          "classificationName": "知识产权",
          "classificationCode": "LD"
        }, {
          "name": "企业社保账户开户",
          "serialId": "SHSHHR0001",
          "classificationName": "社保",
          "classificationCode": "HR"
        }, {
          "name": "企业公积金账户开户",
          "serialId": "SHSHHR0002",
          "classificationName": "社保",
          "classificationCode": "HR"
        }, {
          "name": "委托代缴社保公积金服务",
          "serialId": "SHSHHR0003",
          "classificationName": "社保",
          "classificationCode": "HR"
        }, {
          "name": "个人社保开户",
          "serialId": "SHSHHR0004",
          "classificationName": "社保",
          "classificationCode": "HR"
        }, {
          "name": "个人社保公积金代缴",
          "serialId": "SHSHHR0005",
          "classificationName": "社保",
          "classificationCode": "HR"
        }, {
          "name": "人力资源基础文档",
          "serialId": "SHSHHR0006",
          "classificationName": "公司人事",
          "classificationCode": "HR"
        }, {
          "name": "标准网站",
          "serialId": "SHSHIT0001",
          "classificationName": "网站设计",
          "classificationCode": "IT"
        }, {
          "name": "定制网站",
          "serialId": "SHSHIT0002",
          "classificationName": "网站设计",
          "classificationCode": "IT"
        }, {
          "name": "差旅及费用管理平台服务（SaaS）",
          "serialId": "SHSHIT0003",
          "classificationName": "网站设计",
          "classificationCode": "IT"
        }, {
          "name": "VI设计",
          "serialId": "SHSHIT0004",
          "classificationName": "LOGO设计",
          "classificationCode": "IT"
        }, {
          "name": "LOGO设计(一个方案)",
          "serialId": "SHSHIT0005",
          "classificationName": "LOGO设计",
          "classificationCode": "IT"
        }, {
          "name": "LOGO设计(三个方案)",
          "serialId": "SHSHIT0006",
          "classificationName": "LOGO设计",
          "classificationCode": "IT"
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
        }
      },
      isCurrent(code) {
        return code == this.$route.params.classificationCode
      },
      switchClassification(code) {
        this.$router.replace({name: 'product-list', params: {'classificationCode': code}})
      },
      jumpToDetail(serialId) {
        this.$router.push({name: 'product-detail', params: {serialId: serialId}})
      }
    },
    computed: {
      list() {
        let list = this.lists.filter(
          item => item.classificationCode == this.$route.params.classificationCode)
        var result = []
        for (let i of this.currentClassification.subs) {
          result.push(list.filter(item => item.classificationName == i))
        }
        return result
      }
    },
    watch: {
      '$route': 'init'
    },
    created() {
      this.init()
//      todo: 对接API。
    }
  }
</script>

<style scoped>
  #product-list {
    display: flex;
  }

  #lists {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 90px;
    max-width: 90px;
  }

  .list {
    padding-bottom: 15px;
    width: 70px;
    text-align: center;
    border-bottom: 1px solid #aaa;
    color: #aaa;
  }

  .list.active {
    color: #199cd8;
    border-bottom: 3px solid #199cd8;
  }

  .list img {
    margin: 15px auto 8px;
    width: 35px;
    height: 35px;
    text-align: center;
    display: block;
  }

  #content {
    background: #eee;
    flex-grow: 1;
  }

  .content-header {
    display: flex;
    padding: 0 10px;
    height: 30px;
    align-items: center;
    color: #666;
  }

  .dot {
    margin-right: 5px;
  }

  .content-body {
    display: flex;
    align-items: center;
    background: white;
    flex-wrap: wrap;
    padding: 0 10px 10px;
  }

  .product {
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 5px;
    font-size: 13px;
    margin-top: 10px;
    margin-right: 10px;
  }
</style>
