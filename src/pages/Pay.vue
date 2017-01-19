<template>
  <div id="pay">
    <lh-page-header title="结 算"></lh-page-header>
    <div v-if="getOrder">
      <div style="margin-top: 10px;">
        <mt-cell v-for="item in getOrder.details"
                 :title="item.name"
                 :label="item.amount + '×' + item.unit">
          <span>&yen; {{ totalPrice(item) }}</span>
          <span style="font-size: 12px;" v-if="item.premium > 0">&nbsp;( + {{ item.premium.toFixed(2) }} ) </span>
        </mt-cell>
      </div>
      <div style="margin-top: 10px;">
        <mt-cell title="实付金额">
          <span>&yen; {{ getOrder.totalPrice.toFixed(2) }}</span>
        </mt-cell>
      </div>
    </div>
    <mt-radio
      align="right"
      v-model="payment"
      title="选择支付方式"
      :options="payments">
    </mt-radio>
    <div style="margin: 15px 10px 0;">
      <mt-button type="primary"
                 @click.native="pay"
                 size="large">
        确认付款
      </mt-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui'
  import pingpp from 'pingpp-js'
  export default {
    data () {
      return {
        payment: 'WXPAY_WAP',
        payments: [
          {
            label: '微信（推荐）',
            value: 'WXPAY_WAP'
          },
          {
            label: '支付宝',
            value: 'ALIPAY_WAP'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'getOrder'
      ])
    },
    methods: {
      pay () {
        Indicator.open({
          text: '跳转中...'
        })
        let vm = this
        this.$store.dispatch('changePayment', {serialId: this.getOrder.serialId, payment: this.payment}).then(
          order => {
            pingpp.setAPURL('/static/pay.htm')
            pingpp.createPayment(order.charge, function (result, err) {
              if (result === 'success') {
                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                vm.$router.replace({name: 'success'})
              } else if (result === 'fail') {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
                vm.$router.replace({name: 'order'})
              } else if (result === 'cancel') {
                // 微信公众账号支付取消支付
                vm.$router.replace({name: 'order'})
              }
            })
          },
          () => {}
        )
      },
      totalPrice (detail) {
        let member = detail.member - detail.minMember
        if (member > 0) {
          return (detail.amount * (detail.unitPrice +
          detail.perPrice * (detail.member - detail.minMember)) + detail.premium * 1).toFixed(2)
        } else {
          return (detail.amount * detail.unitPrice + detail.premium * 1).toFixed(2)
        }
      }
    },
    created () {
      if (!this.getOrder) {
        this.$router.replace({name: 'order'})
      }
    },
    mounted () {
      if (navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1) {
        this.payments = [
          {
            label: '支付宝',
            value: 'ALIPAY_WAP'
          }
        ]
        this.payment = 'ALIPAY_WAP'
      }
    },
    beforeDestroy () {
      Indicator.close()
    }
  }
</script>

<style scoped>
  #pay {
    background: #f9f9f9;
    padding-top: 44px;
    min-height: 100%;
  }

  p {
    line-height: 30px;

  }
</style>
