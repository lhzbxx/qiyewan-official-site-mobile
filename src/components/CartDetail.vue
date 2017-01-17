<template>
  <div id="cart-detail">
    <div id="details"
         v-bind:class="{ active: showDetails }">
      <img src="../assets/close.png"
           alt="×"
           id="close-button"
           v-on:click="showDetails = false">
      <div id="details-header">
        <lh-table-entry :name="form.product.name"
                        :cover="form.product.cover"
                        :summary="form.product.summary"
                        :price="form.product.unitPrice"
                        :isSplit=false>
        </lh-table-entry>
      </div>
      <div class="details-content">
        <p class="details-content-title">服务区域</p>
        <span class="details-content-region" style="border-color: #aaa;">{{ getRegion.name }}</span>
        <span class="details-content-region" style="margin-left: 10px;">{{ selectedDistrict }}
          <img src="../assets/down.png" width="12" style="vertical-align: middle">
          <select v-model="selectedDistrict">
            <option v-for="item in getRegion.areas">{{ item }}</option>
          </select>
        </span>
      </div>
      <div class="details-content" v-if="!form.product.isInstant">
        <p class="details-content-title">服务时长</p>
        <!--<p class="details-content-period"-->
           <!--v-on:click="form.amount = 6"-->
           <!--v-bind:class="{ active: form.amount == 6}"-->
           <!--style="margin-left: 5px;">半年</p>-->
        <p class="details-content-period"
           v-on:click="form.amount = 12"
           v-bind:class="{ active: form.amount == 12 }">一年</p>
      </div>
      <div class="details-content" v-if="form.product.isInstant">
        <p class="details-content-title">数量</p>
        <p class="details-content-amount"
           v-on:click="form.amount > 1 ? form.amount-- : ''"
           v-bind:class="{ active: form.amount > 1 }"
           style="margin-left: 5px;">&minus;</p>
        <input class="details-content--amount" type="number" v-model="form.amount">
        <p class="details-content-amount active"
           v-on:click="form.amount++">&plus;</p>
      </div>
      <div class="details-content" v-if="form.product.perPrice > 0">
        <p class="details-content-title">人数</p>
        <p class="details-content-amount"
           v-on:click="form.member > 1 ? form.member-- : ''"
           v-bind:class="{ active: form.member > 1 }"
           style="margin-left: 5px;">&minus;</p>
        <p class="details-content-amount" style="width: 50px;">{{ form.member }}</p>
        <p class="details-content-amount active"
           v-on:click="form.member++">&plus;</p>
      </div>
      <div class="details-content">
        <p class="details-content-title">补 差 价</p>
        <p>{{form.aaaa}}</p>
        <input class="details-content--amount" type="number" min="0" v-model="form.aaaa">
        <input class="details-content--amount" type="number" min="0" v-model="form.premium">
      </div>
      <div id="details-bottom">
        <div id="confirm-price">
          <span style="font-size: 13px;">总计</span>
          <span style="color: red;">
          <span style="font-size: 10px;">&yen;</span>
            <b>{{ form | sub-total-price-filter }}</b>
          </span>
        </div>
        <div id="confirm-button"
             v-on:click="confirm">确 定
        </div>
      </div>
      <div style="position: relative; height: auto;">
      </div>
    </div>
    <div id="mask"
         v-on:click="showDetails = false"
         v-bind:class="{ active: showDetails }">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        selectedDistrict: null,
        showDetails: false
      }
    },
    props: {
      form: {
        id: String,
        amount: Number,
        member: Number,
        serialId: String,
        regionCode: String,
        region: String,
        product: Object,
        premium: Number
      },
      from: String
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'getRegion'
      ])
    },
    methods: {
      open () {
        this.showDetails = true
      },
      close () {
        this.showDetails = false
      },
      confirm () {
        if (!this.isLogin) {
          return this.$router.push({name: 'auth'})
        }
        this.form.region = this.getRegion.pName + '-' + this.getRegion.name + '-' + this.selectedDistrict
        this.$emit('confirm')
      }
    },
    mounted () {
      this.form.regionCode = this.getRegion.code
      this.form.serialId = this.form.product.serialId
      this.selectedDistrict = this.getRegion.areas[0]
      this.form.amount = this.form.product.isInstant ? 1 : 12
    }
  }
</script>

<style scoped>
  #close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
  }

  #details-header {
    margin-top: 20px;
    margin-bottom: 8px;
    padding: 0 60px 0 10px;
    border-bottom: 1px solid #eee;
    min-height: 99px;
  }

  .details-content {
    display: flex;
    margin: 0 10px;
    align-items: center;
    height: 45px;
    min-height: 45px;
  }

  .details-content-region {
    margin-left: 5px;
    padding: 0 15px;
    line-height: 30px;
    font-size: 14px;
    border: 1px solid #26a2ff;
    position: relative;
  }

  select {
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .details-content-amount:first-child {
    margin-left: 20px;
  }

  .details-content--amount {
    outline: none;
    padding: 0 8px 0 8px;
    height: 32px;
    border: none;
    font-size: 13px;
    width: 70px;
    text-align: center;
  }

  .details-content-amount {
    line-height: 30px;
    font-size: 13px;
    border: 1px solid #ddd;
    width: 30px;
    text-align: center;
    margin-left: -1px;
  }

  .details-content-amount.active {
    color: #26a2ff;
  }

  .details-content-period {
    font-size: 14px;
    line-height: 24px;
    padding: 3px 10px;
    margin-left: 5px;
    width: 94px;
    text-align: center;
    border: 1px solid #ddd;
  }

  .details-content-period.active {
    border-color: #26a2ff;
  }

  .details-content-title {
    width: 70px;
    font-size: 13px;
    line-height: 40px;
    text-align: right;
    margin-right: 10px;
  }

  #details-bottom {
    display: flex;
    position: relative;
    bottom: 0;
    width: 100%;
    background: #efefef;
    align-items: center;
    border-top: 1px solid #ddd;
    min-height: 50px;
    margin-top: auto;
  }

  #confirm-price {
    width: 60%;
    text-align: center;
  }

  #confirm-button {
    height: 50px;
    background: #26a2ff;
    color: white;
    width: 40%;
    line-height: 50px;
    text-align: center;
    font-size: 15px;
    margin-left: auto;
  }

  #mask {
    width: 100%;
    height: 100%;
    position: fixed;
    opacity: 0;
    background: black;
    z-index: -1;
    top: 44px;
    transition: opacity 0.5s ease-in-out, z-index 0s 0.5s;
  }

  #mask.active {
    opacity: 0.6;
    z-index: 100;
    transition: opacity 0.5s ease-in-out, z-index 0s 0s;
  }

  #details {
    width: 100%;
    height: 0;
    position: fixed;
    bottom: -50px;
    background: #fafafa;
    z-index: 101;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    transition: height 0.25s ease-in-out;
  }

  #details.active {
    bottom: 0;
    height: 70%;
    min-height: 128px;
    transition: height 0.5s ease-in-out;
  }

  b {
    color: red;
    font-size: 16px;
    font-weight: 700;
    font-family: arial, serif;
  }
</style>
