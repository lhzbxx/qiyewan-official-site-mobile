<style scoped>
  #product-detail {
    background: white;
  }

  #product-detail-cover {
    width: 100%;
    margin-top: 3px;
  }

  #product-detail-name {
    font-size: 16px;
    margin-top: 10px;
    padding: 0 10px;
  }

  #product-detail-summary {
    font-size: 13px;
    color: #999;
    margin-top: 10px;
    padding: 0 10px;
  }

  #product-detail-price {
    color: red;
    margin-top: 15px;
    font-size: 20px;
    padding: 0 10px;
  }

  #product-detail-comment {
    color: #aaa;
    margin-top: 8px;
    font-size: 13px;
    padding: 0 10px;
  }

  #service-list {
    margin-top: 20px;
  }

  .service {
    width: 25%;
    float: left;
    height: 25px;
    text-align: center;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  .service img {
    height: 10px;
    float: left;
    vertical-align: middle;
  }

  .service p {
    float: left;
    font-size: 13px;
    vertical-align: middle;
  }

  span {
    font-size: 13px;
  }
</style>

<template>
  <div id="product-detail">
    <mt-header title="long long long long title">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">商品详情</mt-tab-item>
      <mt-tab-item id="2">常见问题</mt-tab-item>
      <mt-tab-item id="3">用户评论（{{ product.purchaseNumber }}）</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <img id="product-detail-cover"
             :src="'http://ofw6tmkxn.bkt.clouddn.com/' + product.cover"
             :alt="product.name">
        <p id="product-detail-name">{{ product.name }}</p>
        <p id="product-detail-summary">{{ product.summary }}</p>
        <p id="product-detail-price">
          <span>&yen;&nbsp;</span>
          {{ product.unitPrice.toFixed(2) }}
        </p>
        <p id="product-detail-comment">（我们价格为平台服务费，官费指国家行政收费，刻章工本费由客户承担。注：不用不同，详情请咨询我公司客服，电话：400-716-8896）</p>
        <div id="service-list" class="clearfix">
          <div class="service" v-for="item in services">
            <img src="../assets/logo.png" alt="">
            <p>一站式服务</p>
          </div>
        </div>
        <p class="product-detail-title">您将得到</p>
        <p class="product-detail-title">所需材料</p>
        <p class="product-detail-title">服务流程&服务周期</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="2"></mt-tab-container-item>
      <mt-tab-container-item id="3"></mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: "1",
        services: [
          '一站式服务',
          '实时短信',
          '实时提醒',
          '一对一服务'
        ],
        product: {
          "id": 2,
          "serialId": "SHSHPS0002",
          "name": "法财宝",
          "classificationCode": "PS",
          "classificationName": "套餐",
          "regionCode": "SHSH",
          "heat": 0,
          "productState": "PutAway",
          "unitPrice": 5800.00,
          "unit": "个",
          "isHot": true,
          "isInstant": true,
          "summary": "核税+一年记账（零申报）+ 一年法律咨询；法律咨询（不限次数）、书面法律意见（12 份）、合同审核与撰写（50 份）、律师函（4 份）",
          "cover": "product-SHSHPS0002-cover.jpg",
          "whatNeed": "product-SHSHPS0002-what-need.png",
          "whatObtain": "product-SHSHPS0002-what-obtain.png",
          "process": "[\"核税流程\",\"法律咨询流程\", \"代理结账流程\"]",
          "info": "",
          "rate": 5.0,
          "purchaseNumber": 1,
          "comment": "",
          "createAt": 1478055060000,
          "updateAt": 1478055060000
        }
      }
    }
  }
</script>
