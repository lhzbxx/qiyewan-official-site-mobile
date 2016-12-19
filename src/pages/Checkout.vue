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
  export default {
    data () {
      return {
        payment: 'Alipay',
        payments: [
          {
            label: '微信支付',
            value: 'WeChat_PC'
          },
          {
            label: '支付宝',
            value: 'Alipay'
          },
          {
            label: '银行卡',
            value: 'Bank'
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
        if (this.payment === 'Bank') {
          return Toast({
            message: '暂不支持该支付方式',
            position: 'bottom',
            duration: 3000
          })
        }
        Indicator.open({
          text: '跳转中...'
        })
        let vm = this
        this.$store.dispatch('addToOrder', {carts: this.getCheckout, payment: this.payment}).then(
          order => {
            vm.$store.commit('TO_PAY', order)
            vm.$router.push({name: 'pay'})
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
