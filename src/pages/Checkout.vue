<template>
  <div id="checkout">
    <lh-page-header title="结 算"></lh-page-header>
    <div style="margin-top: 10px;">
      <mt-cell v-for="item in getCheckout"
               :title="item.product.name"
               :label="item.amount + '×' + item.product.unit">
        <span>&yen; {{ item | sub-total-price-filter }}</span>
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
  import {mapGetters} from 'vuex'
  import {Toast, Indicator} from 'mint-ui'
  import pingpp from 'pingpp-js'
  export default {
    data () {
      return {
        payment: 'WXPAY_WAP',
        payments: [
          {
            label: '微信支付',
            value: 'WXPAY_WAP'
          },
          {
            label: '支付宝',
            value: 'ALIPAY_WAP'
          },
          {
            label: '银行卡',
            value: 'UPACP_WAP'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'getCheckout'
      ]),
      totalPrice () {
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
      pay () {
        if (this.payment === 'UPACP_WAP') {
          return Toast({
            message: '暂不支持该支付方式',
            position: 'bottom',
            duration: 3000
          })
        }
        Indicator.open({
          text: '跳转中...'
        })
        this.$store.dispatch('addToOrder', {carts: this.getCheckout, payment: this.payment}).then(
          order => {
            pingpp.createPayment(order.charge, function (result, err) {
              if (result === 'success') {
                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
              } else if (result === 'fail') {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
              } else if (result === 'cancel') {
                // 微信公众账号支付取消支付
              }
            })
//            vm.$store.commit('TO_PAY', order)
//            vm.$router.push({name: 'pay'})
          },
          () => {}
        )
      }
    },
    mounted () {
      if (this.getCheckout.length === 0) {
        this.$router.replace({name: 'home'})
      }
    },
    beforeDestroy () {
      Indicator.close()
    }
  }
</script>

<style scoped>
  #checkout {
    background: #f9f9f9;
    padding-top: 44px;
    min-height: 100%;
  }

  p {
    line-height: 30px;

  }
</style>
