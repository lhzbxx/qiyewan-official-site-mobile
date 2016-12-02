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
  import {Toast} from 'mint-ui'
  import {Indicator} from 'mint-ui'
  export default {
    data() {
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
      pay() {
        if (this.payment == 'Bank') {
          return Toast({
            message: '暂不支持该支付方式',
            position: 'bottom',
            duration: 3000
          })
        }
        Indicator.open({
          text: '跳转中...',
        })
        this.$store.dispatch('addToOrder', {carts: this.getCheckout, payment: this.payment}).then(
          order => {
            switch (order.payment) {
              case 'Alipay':
                window.open(order.payUrl, "_self")
                break
              case 'WeChat_PC':
//                alert(new DOMParser(order.payUrl).childNodes[0].childNodes[20].childNodes[0].nodeValue)
//                window.open(new DOMParser(order.payUrl).childNodes[0].childNodes[20].childNodes[0].nodeValue, "_self")
                function onBridgeReady() {
                  WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                      "appId": "wx2421b1c4370ec43b",     //公众号名称，由商户传入
                      "timeStamp": " 1395712654",         //时间戳，自1970年以来的秒数
                      "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串
                      "package": "prepay_id=u802345jgfjsdfgsdg888",
                      "signType": "MD5",         //微信签名方式：
                      "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
                    },
                    function (res) {
                      if (res.err_msg == "get_brand_wcpay_request：ok") {
                      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
                  );
                }
                if (typeof WeixinJSBridge == "undefined") {
                  if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                  } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                  }
                } else {
                  onBridgeReady();
                }
                break
            }
          },
          error => {
          }
        )
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
    padding-top: 44px;
    min-height: 100%;
  }

  p {
    line-height: 30px;

  }
</style>
