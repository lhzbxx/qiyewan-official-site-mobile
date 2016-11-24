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
        <span id="details-content-region">闵行区
          <select value="闵行区">
            <option value="闵行区">闵行区</option>
            <option value="闵行区">闵行区</option>
            <option value="闵行区">闵行区</option>
            <option value="闵行区">闵行区</option>
            <option value="闵行区">闵行区</option>
          </select>
        </span>
      </div>
      <div class="details-content">
        <p class="details-content-title">服务时长</p>
        <p class="details-content-period"
           v-on:click="form.amount = 6"
           v-bind:class="{ active: form.amount == 6}"
           style="margin-left: 5px;">半年</p>
        <p class="details-content-period"
           v-on:click="form.amount = 12"
           v-bind:class="{ active: form.amount == 12 }">一年</p>
      </div>
      <div class="details-content">
        <p class="details-content-title">数量</p>
        <p class="details-content-amount"
           v-on:click="form.amount > 1 ? form.amount-- : pass"
           v-bind:class="{ active: form.amount > 1 }"
           style="margin-left: 5px;">&minus;</p>
        <p class="details-content-amount">{{ form.amount }}</p>
        <p class="details-content-amount active"
           v-on:click="form.amount++">&plus;</p>
      </div>
      <div class="details-content">
        <p class="details-content-title">人数</p>
        <p class="details-content-amount"
           v-on:click="form.member > 1 ? form.member-- : pass"
           v-bind:class="{ active: form.member > 1 }"
           style="margin-left: 5px;">&minus;</p>
        <p class="details-content-amount">{{ form.member }}</p>
        <p class="details-content-amount active"
           v-on:click="form.member++">&plus;</p>
      </div>
      <div id="details-bottom">
        <div></div>
        <div id="confirm-button"
             v-on:click="showDetails = false">确 定</div>
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
  export default {
    data() {
      return {
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
        product: Object
      }
    },
    methods: {
      open() {
        this.showDetails = true
      }
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
    height: 50px;
    min-height: 50px;
  }

  #details-content-region {
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

  .details-content-amount {
    line-height: 30px;
    padding: 0 8px;
    margin-left: -1px;
    font-size: 18px;
    border: 1px solid #ddd;
  }

  .details-content-amount.active {
    color: #26a2ff;
  }

  .details-content-period {
    font-size: 14px;
    line-height: 24px;
    padding: 3px 10px;
    margin-left: 15px;
    width: 70px;
    text-align: center;
    border: 1px solid #ddd;
  }

  .details-content-period.active {
    border-color: #26a2ff;
  }

  .details-content-title {
    width: 70px;
    font-size: 16px;
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

  #confirm-button {
    height: 50px;
    background: #26a2ff;
    color: white;
    width: 40%;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    margin-left: auto;
  }

  #mask {
    width: 100%;
    height: 100%;
    position: fixed;
    opacity: 0;
    background: black;
    z-index: -1;
    top: 50px;
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
</style>
