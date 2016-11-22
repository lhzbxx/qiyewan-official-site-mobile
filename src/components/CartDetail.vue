<template>
  <div id="details"
       v-bind:class="{ active: showDetails }">
    <img src=""
         alt="×"
         id="close-button"
         v-on:click="showDetails = false">
    <div id="details-header">
      <lh-table-entry :name="product.name"
                      :cover="product.cover"
                      :summary="product.summary"
                      :price="product.unitPrice"
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
      <div id="confirm-button">确 定</div>
    </div>
    <div id="mask"
         v-on:click="showDetails = false"
         v-bind:class="{ active: showDetails }">
    </div>
  </div>
</template>
