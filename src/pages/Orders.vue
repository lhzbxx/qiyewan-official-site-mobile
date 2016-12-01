<template>
  <div id="orders">
    <lh-page-header :hasBack=false
                    title="订 单"></lh-page-header>
    <lh-home-footer :index="2"></lh-home-footer>
    <lh-tabs-header :tabs="orderState"
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
                         :createAt="order.createAt"></lh-order-header>
        <lh-table-entry :name="item.name"
                        :cover="item.cover"
                        :summary="item.summary"
                        :price="item.unitPrice"
                        :amount="item.amount"
                        :unit="item.unit"
                        :isLast="order.details.length == index + 1"
                        class="product"
                        :isSplit=false
                        v-for="(item, index) in order.details">
        </lh-table-entry>
        <div class="ops-block">
          <p class="button warning"
             v-if="order.orderState == 'Unpaid'"
             v-on:click="handleCancelButton(order)">删除</p>
          <p class="button"
             v-if="order.orderState == 'Unpaid'"
             v-on:click="handlePayButton(order.payUrl)">去支付</p>
          <p class="button disabled"
             v-if="order.orderState == 'Timeout'">已超时</p>
          <p class="button disabled"
             v-if="order.orderState == 'Canceled'">已取消</p>
          <p class="button"
             v-if="order.orderState == 'Paid'"
             v-on:click="handleReviewButton(order)">去评价</p>
          <p class="button"
             v-if="order.orderState == 'Reviewed'"
             v-on:click="handleAnotherButton(order)">再来一份</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    data() {
      return {
        isLoading: true,
        error: null,
        currentState: 0,
        orderState: [
          '全部',
          '未付款',
          '待评价',
          '已完成'
        ],
        orders: []
      }
    },
    methods: {
      changeCurrent(current) {
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
      },
      fetchData() {
        let vm = this
        this.loading = true
        this.orders = []
        var orderState = 'All'
        switch (this.currentState) {
          case 1:
            orderState = 'Unpaid'
            break
          case 2:
            orderState = 'Paid'
            break
          case 3:
            orderState = 'Reviewed'
            break
        }
        this.$store.dispatch('getOrders', {page: 1, orderState: orderState}).then(
          data => {
            vm.orders = data.content
            vm.isLoading = false
          },
          error => {
            vm.error = error
          }
        )
      },
      handleCancelButton(order) {
        let vm = this
        MessageBox.confirm('确认取消订单吗？').then(
          action => {
            vm.$store.dispatch('cancelOrder', order.serialId).then(
              order.orderState = 'Canceled'
            )
          },
          () => {
          }
        )
      },
      handlePayButton(payUrl) {
        window.open(payUrl, "_self")
      },
      handleReviewButton(item) {
        let detail = item.details[item.details.findIndex(item => !item.isReviewed)]
        this.$store.commit('REVIEW', detail)
        this.$router.push({
          name: 'review',
          params: {productSerialId: detail.productSerialId, orderSerialId: item.serialId}
        })
      },
      handleAnotherButton(item) {
      }
    },
    watch: {
      'currentState': 'fetchData'
    },
    created() {
      this.currentState = this.$route.params.state ? this.$route.params.state : 0
      this.fetchData()
    }
  }
</script>

<style scoped>
  #orders {
    padding-top: 44px;
    padding-bottom: 50px;
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
