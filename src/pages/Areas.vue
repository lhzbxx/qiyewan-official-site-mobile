<template>
  <div id="areas">
    <label class="mint-radiolist-title">当前位置</label>
    <mt-cell
      title="标题文字"
      value="已选地区"
      v-for="item in payments">
    </mt-cell>
    <label class="mint-radiolist-title">当前位置</label>
    <mt-radio
      align="right"
      v-model="payment"
      title="全部地区"
      :options="payments">
    </mt-radio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
