<template>
  <div id="pay">
    <lh-page-header title="结算"></lh-page-header>
    <div>
      <mt-cell v-for="item in checkouts"
               :title="item.name"
               :label="item.amount + '×' + item.unit">
        <span>&yen; {{ subtotalPrice(item) }}</span>
      </mt-cell>
    </div>
    <div style="margin-top: 10px;">
      <mt-cell title="实付金额">
        <span>&yen; {{ totalPrice.toFixed(2) }}</span>
      </mt-cell>
    </div>
    <mt-radio
      align="right"
      v-model="payment"
      title="选择支付方式"
      :options="payments">
    </mt-radio>
    <div style="margin: 15px 10px 0;">
      <mt-button type="primary"
                 @click.native="pay()"
                 size="large">
        确认付款
      </mt-button>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';

  export default {
    data() {
      return {
        checkouts: [
          {
            name: '注册财税一条龙',
            unitPrice: 123,
            amount: 1,
            unit: '月'
          },
          {
            name: '注册财税一条龙',
            unitPrice: 123,
            amount: 1,
            unit: '月'
          },
          {
            name: '注册财税一条龙',
            unitPrice: 123,
            amount: 1,
            unit: '月'
          }
        ],
        payment: 'WeChat',
        payments: [
          {
            label: '微信支付',
            value: 'WeChat',
          },
          {
            label: '支付宝',
            value: 'AliPay'
          },
          {
            label: '银行卡',
            value: 'Bank',
            disabled: true
          }
        ]
      }
    },
    computed: {
      totalPrice() {
        var result = 0
        for (let i of this.checkouts) {
          result += i.amount * i.unitPrice
        }
        return result
      }
    },
    methods: {
      subtotalPrice(checkout) {
        return checkout.amount * checkout.unitPrice
      },
      pay() {
        Indicator.open({
          text: '跳转中...',
        });
      }
    },
    beforeDestroy() {
      Indicator.close();
    }
  }
</script>

<style scoped>
  #pay {
    background: #f9f9f9;
    margin-top: 50px;
  }

  p {
    line-height: 30px;

  }
</style>
