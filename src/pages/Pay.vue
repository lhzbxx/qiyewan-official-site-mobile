<template>
  <div id="pay">
    <lh-page-header title="结 算"></lh-page-header>
    <mt-cell v-for="item in getCheckout"
             :title="item.product.name"
             :label="item.amount + '×' + item.product.unit">
      <span>&yen; {{ item | sub-total-price-filter }}</span>
    </mt-cell>
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
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui'
  export default {
    data() {
      return {
        payment: 'AliPay',
        payments: [
          {
            label: '微信支付',
            value: 'WeChat',
            disabled: true
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
      ...mapGetters([
        'getCheckout'
      ]),
      totalPrice() {
        var result = 0
        for (let i of this.getCheckout) {
          let amount = i.amount
          let member = i.member
          if (i.product.serialId.substr(4) === 'HR0003') {
            result += member > 3 ? ((98.8 + 18.8 * (member - 3)) * amount) : (98.8 * amount)
          } else {
            result += (amount * i.product.unitPrice)
          }
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
    mounted() {
      if (this.getCheckout.length == 0) {
        this.$router.replace({name: 'home'})
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
    padding-top: 50px;
    min-height: 100%;
  }

  p {
    line-height: 30px;

  }
</style>
