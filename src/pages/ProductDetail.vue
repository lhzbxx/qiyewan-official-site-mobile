<template>
  <div id="product-detail">
    <lh-page-header :title="product ? product.name : '产品详情'"></lh-page-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">商品详情</mt-tab-item>
      <mt-tab-item id="2">常见问题</mt-tab-item>
      <mt-tab-item id="3">用户评论（{{ product ? product.purchaseNumber : 0 }}）</mt-tab-item>
    </mt-navbar>
    <lh-loading v-if="isLoading"></lh-loading>
    <div v-else>
      <mt-tab-container v-model="selected" :swipeable=true>
        <mt-tab-container-item id="1">
          <img id="product-detail-cover"
               :src="product.cover | cdn-filter"
               :alt="product.name">
          <p id="product-detail-name">{{ product.name }}</p>
          <p id="product-detail-summary">{{ product.summary }}</p>
          <p id="product-detail-price">
            <span>&yen;&nbsp;</span>
            {{ product.unitPrice.toFixed(2) }}
          </p>
          <p id="product-detail-comment">（我们价格为平台服务费，官费指国家行政收费，刻章工本费由客户承担。注：不用不同，详情请咨询我公司客服，电话：400-716-8896）</p>
          <lh-services></lh-services>
          <p class="product-detail-title">您将得到</p>
          <div id="product-detail-what-obtain">
            <p class="product-detail-block"
               v-for="item in JSON.parse(product.twhatObtain)">
              {{ item }}
            </p>
          </div>
          <p class="product-detail-title">所需材料</p>
          <div id="product-detail-what-need">
            <p class="product-detail-block"
               v-for="item in JSON.parse(product.twhatNeed)">
              {{ item }}
            </p>
          </div>
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
              <img :src="product.cover | cdn-filter"
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
             v-on:click="openCustomerService()"
             style="width: 30%; margin-left: 0;">
          <img src="../assets/customer-service.png"
               style="margin-top: 11px; height: 28px;">
        </div>
        <div class="bottom-button"
             v-on:click="jumpToPay()"
             style="background: #199cd8;">立即购买
        </div>
        <div class="bottom-button"
             v-on:click="openDetails()"
             style="background: #f7a82d;">加入购物车
        </div>
      </div>
      <lh-cart-detail :form="form"
                      :product="product"
                      ref="details"></lh-cart-detail>
    </div>
  </div>
</template>

<script>
  import productApi from '../api/product'
  import {Toast} from 'mint-ui';
  export default {
    data() {
      return {
        isLoading: true,
        error: null,
        selected: "1",
        form: {
          amount: 1,
          member: 1,
          regionCode: null,
          region: null,
          product: null,
        },
        product: null,
        faqs: [],
        reviews: [],
        toastInstance: null
      }
    },
    methods: {
      openCustomerService() {
        _MEIQIA('showPanel');
      },
      jumpToPay() {
        this.$router.push({name: 'pay'})
      },
      addToCart() {
        if (this.toastInstance) this.toastInstance.close()
        this.toastInstance = Toast({
          message: '操作成功',
          iconClass: 'mintui mintui-success'
        });
        setTimeout(() => {
          this.toastInstance.close()
        }, 2000)
      },
      openDetails() {
        this.$refs.details.open()
      },
      refreshForm() {
        this.form.regionCode = this.getRegion.code
      }
    },
    created() {
      this.loading = true
      let vm = this
      productApi.getProductDetail(this.$route.params.serialId,
        data => {
          vm.product = data
          vm.product.rate = Math.round(vm.product.rate * 10) / 10
          vm.form.product = data
          vm.isLoading = false
        },
        error => {
          vm.error = error
        }
      )
      productApi.getProductFaqs(vm.$route.params.serialId,
        data => {
          vm.faqs = data.content
        },
        error => {
          vm.error = error
        }
      )
      productApi.getProductReviews(vm.$route.params.serialId,
        data => {
          vm.reviews = data.content
        },
        error => {
          vm.error = error
        }
      )
    }
  }
</script>

<style scoped>
  #product-detail {
    background: white;
    margin-bottom: 60px;
    padding-top: 50px;
    min-height: 100%;
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

  span {
    font-size: 13px;
  }

  .product-detail-title {
    margin-top: 10px;
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

  #product-detail-what-obtain {
    display: flex;
    padding: 0 10px;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  #product-detail-what-need {
    display: flex;
    padding: 0 10px;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .product-detail-block {
    padding: 10px 5px;
    font-size: 13px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    margin-right: 8px;
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
    display: flex;
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
