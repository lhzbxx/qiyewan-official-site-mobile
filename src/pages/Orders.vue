<template>
  <div id="orders">
    <lh-page-header :hasBack=false
                    title="订 单"></lh-page-header>
    <lh-home-footer :index="2"></lh-home-footer>
    <lh-tabs-header :tabs="orderState"
                    @change-current="changeCurrent"></lh-tabs-header>
    <lh-loading v-if="isLoading"></lh-loading>
    <div v-else>
      <lh-no-things v-if="orders.length == 0"></lh-no-things>
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
                        v-for="(item, index) in order.details"
                        @click="openDetails(index)">
        </lh-table-entry>
        <div id="ops-block">
          <p class="button warning"
             v-if="currentState == 0"
             v-on:click="handleCancelButton">删除</p>
          <p class="button" v-if="currentState == 0">去支付</p>
          <p class="button" v-if="currentState == 1">去评价</p>
          <p class="button" v-if="currentState == 2">再来一份</p>
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
      handleCancelButton() {
        MessageBox.confirm('确认取消订单吗？').then(action => {
        });
      }
    },
    created() {
      let vm = this
      this.currentState = this.$route.params.state | 0
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
    }
  }
</script>

<style scoped>
  #orders {
    padding-top: 50px;
    padding-bottom: 50px;
    background: #f9f9f9;
    min-height: 100%;
  }

  #order {
    margin-top: 10px;
    background: white;
  }

  #ops-block {
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

  .product {
    padding: 0 10px;
  }
</style>
