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
               height="50">
          <div class="product-info-name">
            <p>{{contractDetail.product}}</p>
            <p>区域：{{$route.query.region | region-filter}}</p>
          </div>
        </div>
        <div class="flex-1">&times;{{contractDetail.number || 1}}</div>
        <p class="flex-1" style="color: red;">￥{{contractDetail.totalPrice}}</p>
      </div>
      <div class="service-nodes-button"
           v-on:click="collapseServices(contractDetail, contractDetailIndex)">
        <img src="../assets/right-arrow.png"
             v-bind:class="{active: isServicesOpen(contractDetailIndex)}">服务节点
      </div>
      <div class="service-nodes-button"
           v-show="isServicesOpen(contractDetailIndex) && !contractDetail.services">
        获取中……
      </div>
      <div class="service-nodes"
           v-for="service in contractDetail.services"
           v-show="isServicesOpen(contractDetailIndex)">
        <p class="service-nodes-header">{{service.productSeries}}</p>
        <div class="service-node"
             v-for="(serviceDetail, serviceDetailIndex) in service.details">
          <div style="text-align: center; width: 20px;">
            <div class="vertical-line"></div>
            <div class="node-circle"
                 v-bind:class="{active: serviceDetailIndex === service.details.length - 1}"></div>
            <div class="vertical-line"></div>
          </div>
          <div class="node-name">
            <p>{{serviceDetail.productServiceName}}</p>
            <p class="node-name-subtitle">{{statusFormat(serviceDetail.status)}}</p>
          </div>
          <p>{{serviceDetail.updDate.substr(0, 10)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import crmApi from '../api/crm'
  export default {
    data () {
      return {
        contractDetails: null,
        openingServices: []
      }
    },
    methods: {
      getServices (detail, contractDetailIndex) {
        if (detail.services) return
        let vm = this
        crmApi.getContractServices(detail.contractSno,
          services => {
            detail.services = services
            for (let i of detail.services) {
              crmApi.getContractServiceDetails(i.sno,
                details => {
                  i.details = details
                  detail.services = services
                  Vue.set(vm.contractDetails, contractDetailIndex, vm.contractDetails[contractDetailIndex])
                }
              )
            }
          }
        )
      },
      collapseServices (contractDetail, contractDetailIndex) {
        this.getServices(contractDetail, contractDetailIndex)
        let index = this.openingServices.findIndex(item => item === contractDetailIndex)
        if (index > -1) {
          this.openingServices.splice(index, 1)
        } else {
          this.openingServices.push(contractDetailIndex)
        }
      },
      isServicesOpen (index) {
        return this.openingServices.findIndex(item => item === index) > -1
      },
      statusFormat (status) {
        switch (status) {
          case '1':
            return '未开始'
          case '2':
            return '进行中'
          case '3':
            return '已完成'
        }
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
    font-size: 14px;
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
    line-height: 20px;
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

  .service-nodes-button img {
    vertical-align: middle;
    margin-right: 8px;
    height: 13px;
    margin-top: -1px;
    transition: transform 0.2s ease-in-out;
  }

  .service-nodes-button img.active {
    transform: rotate(90deg);
  }

  .service-nodes-button {
    background: white;
    height: 35px;
    padding-left: 20px;
    line-height: 35px;
  }

  .service-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .service-nodes {
    padding: 5px 20px 10px 20px;
    border: 1px solid #eee;
    background: white;
  }

  .service-nodes-header {
    line-height: 30px;
    text-align: center;
    font-weight: bold;
  }

  .service-node {
    height: 40px;
    display: flex;
    align-items: center;
  }

  .vertical-line {
    height: 10px;
    width: 0;
    border: 1px solid #333;
  }

  .node-circle {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    border: 2px solid gray;
    margin: 5px 0 5px -4px;
  }

  .node-circle.active {
    width: 16px;
    height: 16px;
    margin: 2px 0 2px -7px;
    background: #e6f7ff;
    border: 2px solid #00a0ea;
  }

  .node-name {
    flex-grow: 1;
  }

  .node-name-subtitle {
    color: #aaa;
  }
</style>
