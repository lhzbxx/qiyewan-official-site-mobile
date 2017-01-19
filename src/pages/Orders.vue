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
        <img src="../assets/empty-order.png" style="width: 110px; height: 110px;">
      </lh-no-things>
      <div v-for="(order, orderIndex) in orders"
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
                        v-for="(item, index) in order.details">
        </lh-table-entry>
        <div class="ops-block">
          <p class="button"
             v-if="order.orderStage == 'UNPAID'"
             v-on:click="handleCancelButton(order)">取消</p>
          <p class="button"
             v-if="order.orderStage == 'UNPAID'"
             v-on:click="handlePayButton(order)">去支付</p>
          <!--<p class="status"-->
             <!--v-if="order.orderStage == 'UNPAID'">-->
            <!--剩余支付时间：{{order.updateAt - new Date() + 2 * 60 * 60 * 1000 | time-filter}}</p>-->
          <p class="button"
             v-if="order.orderStage == 'CANCELED' || order.orderStage == 'TIMEOUT'"
             v-on:click="handleRemoveButton(order, orderIndex)">删除</p>
          <p class="status"
             v-if="order.orderStage == 'TIMEOUT'">已超时</p>
          <p class="status"
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
          case '已评价':
            this.currentState = 3
            break
        }
        this.fetchData()
        this.$router.replace({name: 'order', query: {state: this.currentState}})
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
      handleRemoveButton (order, index) {
        let vm = this
        MessageBox.confirm('确认删除订单吗？').then(
          action => {
            vm.$store.dispatch('removeOrder', order.serialId).then(
              vm.orders.splice(index, 1)
            )
          },
          () => {
          }
        )
      },
      handlePayButton (order) {
        this.$store.commit('ORDER', order)
        this.$router.push({name: 'pay'})
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
        this.$router.push({name: 'product-detail', params: {serialId: item.details[0].productSerialId}})
      },
      goToProductDetail (productSerialId) {
        this.$router.push({name: 'product-detail', params: {serialId: productSerialId}})
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
    font-size: 13px;
    line-height: 13px;
    border-radius: 5px;
    border: 1px solid #c6cbd0;
    font-weight: 500;
    padding: 5px;
    color: #999;
  }

  .product {
    padding: 0 10px;
  }

  .status {
    margin-right: 20px;
    font-size: 12px;
    color: #aaa;
  }
</style>
