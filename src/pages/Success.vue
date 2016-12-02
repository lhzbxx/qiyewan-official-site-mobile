<template>
  <div id="success">
    <i class="mintui mintui-success"
       id="success-flag"></i>
    <p id="title">支付成功</p>
    <p id="description">我们的工作人员会尽快联系您，<br>以完成后续所有的服务流程。</p>
    <mt-button type="primary"
               size="small"
               @click.native="jump"
               id="button">
      查看订单
    </mt-button>
  </div>
</template>

<script>
  export default {
    methods: {
      jump() {
        this.$router.replace({name: 'order', params: {state: 1}})
      }
    }
  }
</script>

<style scoped>
  #success {
    padding-top: 80px;
    text-align: center;
    background: #f9f9f9;
  }

  #success-flag {
    font-size: 80px;
    line-height: 80px;
    border-radius: 50%;
    background: #09bb07;
    color: white;
    height: 180px;
    width: 180px;
    display: block;
    padding-top: 45px;
    margin: 0 auto;
  }

  #button {
    display: block;
    margin: 20px auto;
  }

  #title {
    font-size: 24px;
    margin-top: 30px;
    font-weight: bold;
  }

  #description {
    font-size: 12px;
    line-height: 15px;
    margin-top: 15px;
    color: #aaa;
  }
</style>
