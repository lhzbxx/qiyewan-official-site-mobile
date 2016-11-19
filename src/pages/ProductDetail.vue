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
            <p>{{ item }}</p>
          </div>
        </div>
        <p class="product-detail-title">您将得到</p>
        <p class="product-detail-title">所需材料</p>
        <p class="product-detail-title">服务流程&服务周期</p>
        <div id="product-detail-processes">
          <p class="product-detail-process"
             v-for="item in JSON.parse(product.process)">
            {{ item }}
          </p>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="faq"
             v-for="item in faqs">
          <p class="faq-question">
            {{ item.question }}
          </p>
          <p class="faq-answer">
            {{ item.answer }}
          </p>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="review" v-for="item in 4">
          <div class="review-info">
            <img src="http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg"
                 alt=""
                 class="user-avatar">
            <span class="user-nickname">尼古拉斯`赵四</span>
            <span class="review-create-at">2015年9月13日</span>
          </div>
          <p class="review-content">服务实在是太好了！</p>
          <div class="review-details">
            <p>购买数量：3&times;月</p>
            <p>购买日期：2015年9月13日</p>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div id="bottom">
      <div class="bottom-button"
           style="width: 30%; margin-left: 0;">
        <img>
      </div>
      <div class="bottom-button"
           style="background: #199cd8;">立即购买
      </div>
      <div class="bottom-button"
           style="background: #f7a82d;">加入购物车
      </div>
    </div>
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
          "process": "[\"核税流程\", \"法律咨询流程\", \"代理结账流程\", \"完成\"]",
          "info": "",
          "rate": 5.0,
          "purchaseNumber": 1,
          "comment": "",
          "createAt": 1478055060000,
          "updateAt": 1478055060000
        },
        faqs: [{
          "id": 31511,
          "serialId": "SHSHHR0004",
          "question": "社保账户是强制开设的吗？",
          "answer": "是强制的。依据《社会保险法》，社保是强制缴纳。如果不依法缴纳，会处以相应的罚款。"
        }, {
          "id": 31510,
          "serialId": "SHSHHR0004",
          "question": "社保有什么用？",
          "answer": "社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保险：失业时可拿一定时间的失业救济金\n工伤保险：出了工伤时给予补偿\n社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保"
        }, {
          "id": 29303,
          "serialId": "SHSHHR0004",
          "question": "社保账户是强制开设的吗？",
          "answer": "是强制的。依据《社会保险法》，社保是强制缴纳。如果不依法缴纳，会处以相应的罚款。"
        }, {
          "id": 29302,
          "serialId": "SHSHHR0004",
          "question": "社保有什么用？",
          "answer": "社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保险：失业时可拿一定时间的失业救济金\n工伤保险：出了工伤时给予补偿\n社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保"
        }, {
          "id": 25208,
          "serialId": "SHSHHR0004",
          "question": "社保账户是强制开设的吗？",
          "answer": "是强制的。依据《社会保险法》，社保是强制缴纳。如果不依法缴纳，会处以相应的罚款。"
        }, {
          "id": 25207,
          "serialId": "SHSHHR0004",
          "question": "社保有什么用？",
          "answer": "社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保险：失业时可拿一定时间的失业救济金\n工伤保险：出了工伤时给予补偿\n社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保"
        }, {
          "id": 21113,
          "serialId": "SHSHHR0004",
          "question": "社保账户是强制开设的吗？",
          "answer": "是强制的。依据《社会保险法》，社保是强制缴纳。如果不依法缴纳，会处以相应的罚款。"
        }, {
          "id": 21112,
          "serialId": "SHSHHR0004",
          "question": "社保有什么用？",
          "answer": "社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保险：失业时可拿一定时间的失业救济金\n工伤保险：出了工伤时给予补偿\n社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保"
        }, {
          "id": 17018,
          "serialId": "SHSHHR0004",
          "question": "社保账户是强制开设的吗？",
          "answer": "是强制的。依据《社会保险法》，社保是强制缴纳。如果不依法缴纳，会处以相应的罚款。"
        }, {
          "id": 17017,
          "serialId": "SHSHHR0004",
          "question": "社保有什么用？",
          "answer": "社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保险：失业时可拿一定时间的失业救济金\n工伤保险：出了工伤时给予补偿\n社保可以说是国家为每个公民提供的一种福利制度，社保有以下几方面基本作用：\n养老保险：退休工资\n医疗保险：医疗报销，大病统筹\n生育保险：女性可以在生产期间费用报销、领取补贴，男性生育结扎、生殖健康等享受费用报销和津贴\n失业保"
        }]
      }
    }
  }
</script>

<style scoped>
  #product-detail {
    background: white;
    margin-bottom: 60px;
  }

  #product-detail-cover {
    width: 100%;
    margin-top: 3px;
  }

  #product-detail-name {
    font-size: 18px;
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
    overflow: hidden;
  }

  .service {
    width: 25%;
    display: inline-block;
    height: 40px;
    text-align: center;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  .service:first-child {
    padding-left: 10px;
  }

  .service:last-child {
    padding-right: 10px;
  }

  .service img {
    height: 10px;
    display: inline-block;
    vertical-align: middle;
  }

  .service p {
    font-size: 13px;
    display: inline-block;
    line-height: 38px;
  }

  span {
    font-size: 13px;
  }

  .product-detail-title {
    margin-top: 15px;
    margin-left: 10px;
    font-size: 18px;
    color: #333;
  }

  #product-detail-processes {
    margin-top: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
  }

  .product-detail-process {
    display: inline-block;
    font-size: 13px;
    line-height: 35px;
    position: relative;
    margin-right: 20px;
  }

  .product-detail-process:after, .product-detail-process:before {
    border: 7px solid transparent;
    border-left: 7px solid #fff;
    width: 0;
    height: 0;
    position: absolute;
    top: 10px;
    right: -19px;
    content: ' '
  }

  .product-detail-process:before {
    border-left-color: #f00;
    right: -21px;
  }

  .product-detail-process:last-child {
    margin-right: 0;
  }

  .product-detail-process:last-child:before {
    border: none;
  }

  .faq {
    margin-top: 18px;
    padding: 0 10px;
  }

  .faq-question {
    font-size: 16px;
    color: #333;
  }

  .faq-answer {
    margin-top: 8px;
    font-size: 13px;
    color: #aaa;
  }

  #bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 100;
    background: white;
  }

  .bottom-button {
    display: inline-block;
    height: 100%;
    width: 35%;
    line-height: 50px;
    text-align: center;
    color: white;
    font-size: 18px;
    margin-left: -4px;
    border-top: 1px solid #199cd8;
  }

  .review {
    margin: 15px 10px 0;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  .review-info {
    display: flex;
    align-items: center;
  }

  .user-avatar {
    position: relative;
    width: 35px;
    height: 35px;
    overflow: hidden;
    border-radius: 50%;
    vertical-align: middle;
  }

  .user-nickname {
    margin-left: 8px;
    color: #666;
  }
  .review-create-at {
    margin-left: auto;
    color: #aaa;
  }
  .review-content {
    margin-top: 15px;
  }
  .review-details {
    margin-top: 15px;
    color: #aaa;
    font-size: 13px;
    line-height: 18px;
  }
</style>
