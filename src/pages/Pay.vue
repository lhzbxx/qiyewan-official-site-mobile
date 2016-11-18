<template>
  <div id="pay">
    <mt-radio
      align="right"
      v-model="payment"
      :options="payments">
    </mt-radio>
    <div style="margin: 15px 10px 0;">
      <mt-button type="primary"
                 size="large">
        确认付款
      </mt-button>
    </div>
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
            value: 'WeChat'
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
    methods: {
    },
    computed: {
      headerTitle() {
        switch (this.state) {
          case 0:
            return '登 录'
          case 1:
            return '注 册'
          case 2:
            return '重置密码'
        }
      },
      submitButton() {
        switch (this.state) {
          case 0:
            return '登 录'
          case 1:
            return '注 册'
          case 2:
            return '确 认'
        }
      }
    }
  }
</script>

<style scoped>
  #pay {
    background: #f9f9f9;
  }
</style>
