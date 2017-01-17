<template>
  <div id="product-detail">
    <lh-page-header :title="product ? product.name : '产品详情'"></lh-page-header>
    <mt-navbar v-if="isValid" v-model="selected" style="font-size: 18px;">
      <mt-tab-item id="1">商品详情</mt-tab-item>
      <mt-tab-item id="2">常见问题</mt-tab-item>
      <mt-tab-item id="3">用户评论（{{ product ? product.purchaseNumber : 0 }}）</mt-tab-item>
    </mt-navbar>
    <lh-loading v-if="isLoading"></lh-loading>
    <div v-else>
      <img src="../assets/carts.png"
           style="position: fixed; left: 0; bottom: 50px; z-index: 100; width: 60px; padding: 10px;"
           v-on:click="$router.push({name: 'cart'})">
      <mt-tab-container v-model="selected"
                        :swipeable=false>
        <mt-tab-container-item id="1">
          <img id="product-detail-cover"
               :src="isExist ? product.cover : 'product-' + $route.params.serialId.substr(4) + '-cover.jpg' | cdn-filter">
          <p id="product-detail-name">{{ isExist ? product.name : '未知产品' }}</p>
          <p id="product-detail-summary">{{ isExist ? product.summary : '未知产品' }}</p>
          <p id="product-detail-price">
            <span v-if="isExist && isValid">&yen;&nbsp;</span>
            {{ isExist && isValid ? product.unitPrice.toFixed(2) : '该城市不可用本产品' }}
          </p>
          <p id="product-detail-comment">
            （我们价格为平台服务费，官费指国家行政收费，刻章工本费由客户承担。注：如有疑问，详情请咨询我公司客服，电话：400-716-8896）
          </p>
          <div id="product-region"
               v-on:click="$router.push({name: 'areas'})">
            <p style="color: gray;">地区：</p>
            <p style="flex-grow: 1;">{{ getRegion.name }}</p>
            <p style="color: #199cd8; line-height: 40px; padding: 0 10px;">更改&nbsp;
              <img src="../assets/right-arrow.png"
                   height="12"
                   style="vertical-align: middle;">
            </p>
          </div>
          <lh-services></lh-services>
          <div v-if="isExist">
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
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" style="background-color: #f9f9f9; text-align: left; margin-top: 4px">
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
          <div class="review" v-for="item in reviews">
            <div class="review-info">
              <img :src="item.user.avatar ? item.user.avatar : 'avatar.png' | cdn-filter"
                   class="user-avatar">
              <span class="user-nickname">{{ item.user.nickname }}</span>
              <span class="review-create-at">{{ item.createAt | date-filter }}</span>
            </div>
            <p class="review-content">{{ item.content }}</p>
            <div class="review-details">
              <p>购买数量：{{ item.amount }}&times;个</p>
              <p>购买日期：{{ item.buyAt | date-filter }}</p>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div id="bottom">
        <div class="bottom-button"
             onclick="window.location.href='https://static.meiqia.com/dist/standalone.html?eid=39063'"
             style="width: 30%; margin-left: 0;">
          <img src="../assets/customer-service.png"
               style="margin-top: 11px; height: 28px;">
        </div>
        <div class="bottom-button"
             v-on:click="handleDirectBuyButton"
             style="background: #199cd8;">立即购买
        </div>
        <div class="bottom-button"
             v-on:click="handleAddToCartButton"
             style="background: #f7a82d;">加入购物车
        </div>
      </div>
      <lh-cart-detail v-if="isExist"
                      :form="form"
                      :product="product"
                      :from="origin"
                      @confirm="handleConfirmButton"
                      ref="details"></lh-cart-detail>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'mint-ui'
  import productApi from '../api/product'
  export default {
    data () {
      return {
        isLoading: true,
        error: null,
        selected: '1',
        form: {
          amount: 1,
          member: 1,
          premium: 0,
          regionCode: null,
          region: null,
          product: null
        },
        product: null,
        faqs: [],
        reviews: [],
        toastInstance: null,
        origin: '',
        isValid: true
      }
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'getRegion'
      ]),
      isExist () {
        return this.product && this.product.serialId
      }
    },
    methods: {
      warningExist () {
        let vm = this
        if (vm.toastInstance) vm.toastInstance.close()
        vm.toastInstance = Toast({
          message: '产品不可用',
          iconClass: 'mintui mintui-field-error'
        })
        setTimeout(function () {
          vm.toastInstance.close()
        }, 2000)
      },
      handleDirectBuyButton () {
        if (!this.isValid) {
          return this.warningExist()
        }
        if (!this.isLogin) {
          return this.$router.push({name: 'auth'})
        }
        this.origin = 'direct-buy-button'
        this.$refs.details.open()
      },
      handleAddToCartButton () {
        if (!this.isValid) {
          return this.warningExist()
        }
        if (!this.isLogin) {
          return this.$router.push({name: 'auth'})
        }
        this.origin = 'add-to-cart-button'
        this.$refs.details.open()
      },
      refreshForm () {
        this.form.regionCode = this.getRegion.code
        this.form.region = this.getRegion.pName + this.getRegion.name
      },
      handleConfirmButton () {
        let vm = this
        this.$store.dispatch('addToCart', this.form).then(
          data => {
            vm.$refs.details.close()
            switch (vm.origin) {
              case 'add-to-cart-button':
                this.form.isOverride = true
                if (vm.toastInstance) vm.toastInstance.close()
                vm.toastInstance = Toast({
                  message: '操作成功',
                  iconClass: 'mintui mintui-success'
                })
                setTimeout(function () {
                  vm.toastInstance.close()
                }, 2000)
                vm.form.amount = data.amount
                break
              case 'direct-buy-button':
                this.form.isOverride = false
                this.$store.dispatch('addToCart', this.form).then(
                  data => {
                    vm.$store.commit('CHECKOUT', [data])
                    vm.$router.push({name: 'checkout'})
                  },
                  error => {
                    console.log(error)
                  }
                )
                break
            }
          },
          error => {
            vm.$refs.details.close()
            console.log(error)
          }
        )
      },
      fetchData () {
        this.loading = true
        let vm = this
        this.$store.dispatch('getProductDetail', this.$route.params.serialId).then(
          data => {
            if (data.serialId) {
              vm.product = data
              vm.product.rate = Math.round(vm.product.rate * 10) / 10
              vm.form.product = data
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
              vm.isValid = true
            } else {
              vm.isValid = false
            }
            vm.isLoading = false
          },
          error => {
            vm.error = error
          }
        )
      }
    },
    mounted () {
      this.fetchData()
      if (this.getRegion.code !== this.$route.params.serialId.substr(0, 4)) {
        this.$router.replace({
          name: 'product-detail',
          params: {'serialId': this.getRegion.code + this.$route.params.serialId.substr(4)}
        })
        this.fetchData()
      }
    }
  }
</script>

<style scoped>
  #product-detail {
    background: white;
    padding-bottom: 60px;
    padding-top: 44px;
    min-height: 100%;
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

  span {
    font-size: 13px;
  }

  .product-detail-title {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: #333;
  }

  #product-region {
    margin-top: 15px;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 13px;
    border: 1px solid #eee;
    padding-left: 10px;
  }

  #product-detail-processes {
    margin-top: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    color: #666;
  }

  .product-detail-process {
    display: inline-block;
    font-size: 13px;
    line-height: 35px;
    position: relative;
    margin-right: 20px;
  }

  .product-detail-process:after, .product-detail-process:before {
    border: 5px solid transparent;
    border-left: 5px solid #fff;
    width: 0;
    height: 0;
    position: absolute;
    top: 13px;
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
    padding: 7px 5px;
    font-size: 12px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    margin-right: 8px;
    line-height: 17px;
    color: #666;
  }

  .faq {
    margin-top: 18px;
    padding: 0 10px;
  }

  .faq-question {
    font-size: 14px;
    color: #333;
    line-height: 20px;
    padding-left: 5px;
  }

  .faq-answer {
    margin-top: 8px;
    font-size: 13px;
    color: #aaa;
    padding-left: 3px;
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
    font-size: 15px;
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
