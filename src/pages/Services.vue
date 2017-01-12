<template>
  <div id="services">
    <lh-page-header title="客户信息"></lh-page-header>
    <lh-loading v-if="!customers"></lh-loading>
    <div v-else
         v-for="(customer, customerIndex) in customers"
         style="margin-bottom: 10px;">
      <div class="customer">
        <p>客户名称：{{customer.contactName}}</p>
        <p>客户类型：{{customer.type === '1' ? '企业' : '个人'}}</p>
      </div>
      <div class="customer-info"
           v-on:click="collapseCustomerInfo(customerIndex)">
        <img src="../assets/right-arrow.png"
             v-bind:class="{active: isCustomerInfoOpen(customerIndex)}">企业信息
      </div>
      <div class="customer-info-details"
           v-show="isCustomerInfoOpen(customerIndex)">
        <div class="customer-info-detail">企业信息：{{customer.name || '暂无'}}</div>
        <div class="customer-info-detail">法人代表：{{customer.legalPerson || '暂无'}}</div>
        <div class="customer-info-detail">公司地址：{{customer.companyAddress || '暂无'}}</div>
        <div class="customer-info-detail">注册资本：{{customer.registeredCapital || '暂无'}}</div>
        <div class="customer-info-detail">员工人数：{{customer.employees || '暂无'}}</div>
        <div class="customer-info-detail">营业执照：{{customer.businessLicense || '暂无'}}</div>
        <div class="customer-info-detail">纳税登记号：{{customer.xxx || '暂无'}}</div>
        <div class="customer-info-detail">联系地址：{{customer.xxx || '暂无'}}</div>
      </div>
      <div class="customer-info"
           v-on:click="collapseContracts(customer, customerIndex)">
        <img src="../assets/right-arrow.png"
             v-bind:class="{active: isContractsOpen(customerIndex)}">订单
      </div>
      <div class="customer-contracts"
           v-show="isContractsOpen(customerIndex)">
        <div class="customer-info-detail customer-contract"
             v-if="customer.contracts && customer.contracts.length === 0">
          <p>暂无</p>
        </div>
        <div class="customer-info-detail customer-contract"
             v-for="(contract, contractIndex) in customer.contracts"
             v-on:click="jumpToDetail(contract.contractSno, contract.area)">
          <p>{{contract.contractDate.substr(0, 10)}}</p>
          <p>订单编号：{{contract.contractSno}}</p>
          <img src="../assets/right-arrow.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import crmApi from '../api/crm'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        customers: null,
        openingCustomerInfo: [],
        openingContracts: []
      }
    },
    computed: {
      ...mapGetters([
        'getPhone'
      ])
    },
    created () {
      let vm = this
      crmApi.getCustomers(this.getPhone,
        customers => {
          vm.customers = customers
        }
      )
    },
    methods: {
      collapseCustomerInfo (customerIndex) {
        let index = this.openingCustomerInfo.findIndex(item => item === customerIndex)
        if (index > -1) {
          this.openingCustomerInfo.splice(index, 1)
        } else {
          this.openingCustomerInfo.push(customerIndex)
        }
      },
      isCustomerInfoOpen (index) {
        return this.openingCustomerInfo.findIndex(item => item === index) > -1
      },
      getContracts (customer, customerIndex) {
        if (customer.contracts) return
        let vm = this
        crmApi.getContracts(customer.id,
          contracts => {
            customer.contracts = contracts
            Vue.set(vm.customers, customerIndex, vm.customers[customerIndex])
          }
        )
      },
      collapseContracts (customer, customerIndex) {
        this.getContracts(customer, customerIndex)
        let index = this.openingContracts.findIndex(item => item === customerIndex)
        if (index > -1) {
          this.openingContracts.splice(index, 1)
        } else {
          this.openingContracts.push(customerIndex)
        }
      },
      isContractsOpen (index) {
        return this.openingContracts.findIndex(item => item === index) > -1
      },
      jumpToDetail (sno, area) {
        this.$router.push({name: 'service-detail', params: {serviceId: sno}, query: {region: area}})
      }
    }
  }
</script>

<style scoped>
  #services {
    padding-top: 44px;
    background: #eee;
  }

  .customer {
    margin-top: 10px;
    padding-top: 7px;
    padding-left: 10px;
    background: #00a4e4;
    color: #f9f9f9;
    height: 60px;
  }

  .customer p {
    font-size: 15px;
    line-height: 23px;
  }

  .customer-info {
    margin-top: 5px;
    padding-left: 15px;
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    color: #333;
    background: white;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  img {
    vertical-align: middle;
    margin-right: 8px;
    height: 13px;
    margin-top: -1px;
    transition: transform 0.2s ease-in-out;
  }

  img.active {
    transform: rotate(90deg);
  }

  .customer-info-detail {
    padding-left: 15px;
    height: 35px;
    font-size: 13px;
    line-height: 35px;
    color: #666;
    background: white;
    border-bottom: 1px solid #eee;
  }

  .customer-contract {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
