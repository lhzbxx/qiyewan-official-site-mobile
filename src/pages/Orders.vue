<template>
  <div id="orders">
    <lh-page-header :hasBack=false
                    title="订 单"></lh-page-header>
    <lh-home-footer :index="2"></lh-home-footer>
    <lh-tabs-header :tabs="orderStage"
                    :tab="orderStage[currentState]"
                    @change-current="changeCurrent"></lh-tabs-header>
    <lh-loading v-if="isLoading"></lh-loading>
    <div v-else>
      <lh-no-things v-if="orders.length == 0"
                    message="暂无订单">
        <img src="../assets/empty-order.png">
      </lh-no-things>
      <div v-for="order in orders"
           id="order">
        <lh-order-header :serialId="order.serialId"
                         :createAt="order.createAt">
        </lh-order-header>
        <lh-table-entry v-on:click="goToProductDetail(item.productSerialId)"
                        :name="item.name"
                        :cover="item.cover"
                        :summary="item.summary"
                        :price="item.unitPrice"
                        :amount="item.amount"
                        :unit="item.unit"
                        :isLast="order.details.length == index + 1"
                        class="product"
                        :isSplit=false
                        v-for="(item, index) in order.details"
                        >
        </lh-table-entry>
        <div class="ops-block">
          <p class="button warning"
             v-if="order.orderStage == 'UNPAID'"
             v-on:click="handleCancelButton(order)">删除</p>
          <p class="button"
             v-if="order.orderStage == 'UNPAID'"
             v-on:click="handlePayButton(order)">去支付</p>
          <p class="button disabled"
             v-if="order.orderStage == 'TIMEOUT'">已超时</p>
          <p class="button disabled"
             v-if="order.orderStage == 'CANCELED'">已取消</p>
          <p class="button"
             v-if="order.orderStage == 'PAID'"
             v-on:click="handleReviewButton(order)">去评价</p>
          <p class="button"
             v-if="order.orderStage == 'REVIEWED'"
             v-on:click="handleAnotherButton(order)">再来一份</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pingpp from 'pingpp-js'
  import {MessageBox, Toast} from 'mint-ui'
  export default {
    data () {
      return {
        isLoading: true,
        error: null,
        currentState: 0,
        orderStage: [
          '全部',
          '未付款',
          '待评价',
          '已评价'
        ],
        orders: []
      }
    },
    methods: {
      changeCurrent (current) {
        switch (current) {
          case '全部':
            this.currentState = 0
            break
          case '未付款':
            this.currentState = 1
            break
          case '待评价':
            this.currentState = 2
            break
          case '已完成':
            this.currentState = 3
            break
        }
        this.fetchData()
      },
      fetchData () {
        let vm = this
        this.loading = true
        this.orders = []
        var orderStage = 'All'
        switch (this.currentState) {
          case 1:
            orderStage = 'UNPAID'
            break
          case 2:
            orderStage = 'PAID'
            break
          case 3:
            orderStage = 'REVIEWED'
            break
        }
        this.$store.dispatch('getOrders', {page: 1, orderStage: orderStage}).then(
          data => {
            vm.orders = data.content
            vm.isLoading = false
          },
          error => {
            vm.error = error
          }
        )
      },
      handleCancelButton (order) {
        let vm = this
        MessageBox.confirm('确认取消订单吗？').then(
          action => {
            vm.$store.dispatch('cancelOrder', order.serialId).then(
              order.orderStage = 'CANCELED'
            )
          },
          () => {
          }
        )
      },
      handlePayButton (order) {
        if (order.payment.substr(-3) !== 'WAP') {
          return Toast({
            message: '请在官网的桌面端进行支付！',
            position: 'bottom',
            duration: 3000
          })
        }
        pingpp.setAPURL('/static/pay.htm')
        let vm = this
        pingpp.createPayment(order.charge, function (result, err) {
          if (result === 'success') {
            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
            vm.fetchData()
          } else if (result === 'fail') {
            // charge 不正确或者微信公众账号支付失败时会在此处返回
          } else if (result === 'cancel') {
            // 微信公众账号支付取消支付
          }
        })
      },
      handleReviewButton (item) {
        let detail = item.details[item.details.findIndex(item => !item.isReviewed)]
        this.$store.commit('REVIEW', detail)
        this.$router.push({
          name: 'review',
          query: {productSerialId: detail.productSerialId, orderSerialId: item.serialId}
        })
      },
      handleAnotherButton (item) {
        // todo: 处理“再来一份”按钮
      },
      goToProductDetail (productSerialId) {
        console.log(productSerialId)
        this.$router.push({name: 'product-detail', params: { serialId: productSerialId }})
      }
    },
    created () {
      this.currentState = (this.$route.query.state ? Number(this.$route.query.state) : 0) || 0
      this.fetchData()
    }
  }
</script>

<style scoped>
  #orders {
    padding-top: 44px;
    padding-bottom: 44px;
    background: #f9f9f9;
    min-height: 100%;
  }

  #order {
    margin-top: 10px;
    background: white;
  }

  .ops-block {
    margin-bottom: 10px;
    background: white;
    border-top: 1px solid #eee;
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: row-reverse;
    margin-top: -8px;
  }

  .button {
    margin-right: 15px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #26a2ff;
    font-weight: 500;
    padding: 5px 10px;
    color: #26a2ff;
  }

  .button.warning {
    color: red;
    border-color: red;
  }

  .button.disabled {
    color: gray;
    border-color: gray;
  }

  .product {
    padding: 0 10px;
  }
</style>