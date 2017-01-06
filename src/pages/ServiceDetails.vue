<template>
  <div id="service-details">
    <lh-page-header title="服务详情"></lh-page-header>
    <lh-loading v-if="!contractDetails"></lh-loading>
    <div v-else
         v-for="(contractDetail, contractDetailIndex) in contractDetails">
      <div class="product-title">
        <p class="flex-2">服务详情</p>
        <p class="flex-1">数量</p>
        <p class="flex-1">金额</p>
      </div>
      <div class="product">
        <div class="flex-2 product-info">
          <img :src="'product-' + contractDetail.product + '-cover-1.jpg' | cdn-filter"
               style="height: 60px;">
          <div class="product-info-name">
            <p>{{contractDetail.product}}</p><br>
            <p>区域：</p>
          </div>
        </div>
        <div class="flex-1">&times;{{contractDetail.number || 1}}</div>
        <p class="flex-1" style="color: red;">￥{{contractDetail.totalPrice}}</p>
      </div>
      <p>服务节点</p>
    </div>
  </div>
</template>

<script>
  import crmApi from '../api/crm'
  export default {
    data () {
      return {
        contractDetails: null
      }
    },
    created () {
      let vm = this
      crmApi.getContractDetails(this.$route.params.serviceId,
        contractDetails => {
          vm.contractDetails = contractDetails
        }
      )
    }
  }
</script>

<style scoped>
  #service-details {
    padding-top: 44px;
    background: #eee;
  }

  .product-title {
    display: flex;
    align-items: center;
    height: 39px;
    color: #546b79;
    background: white;
    border: 1px solid #eee;
    text-align: center;
    margin-top: 10px;
  }

  .product {
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid #eee;
    height: 80px;
    text-align: center;
  }

  .product-info-name {
    text-align: left;
    margin-left: 8px;
    font-size: 14px;
  }

  .product-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-2 {
    flex: 2;
  }
</style>
