<template>
  <div id="home">
    <lh-home-header></lh-home-header>
    <lh-home-footer :index="1"></lh-home-footer>
    <mt-swipe id="slides"
              :auto="4000"
              :show-indicators="true">
      <mt-swipe-item class="slide"
                     v-for="(item, index) in slides">
        <img :src="item.image" :alt="index">
      </mt-swipe-item>
    </mt-swipe>
    <div id="categories" class="clearfix">
      <div class="category"
           v-on:click="jumpToClassification('IC')">
        <img class="category-image"
             src="../assets/nav-IC.png">
        <p class="category-desc">
          工商服务
        </p>
      </div>
      <div class="category"
           v-on:click="jumpToClassification('IT')">
        <img class="category-image"
             src="../assets/nav-IT.png">
        <p class="category-desc">
          IT&设计
        </p>
      </div>
      <div class="category"
           v-on:click="jumpToClassification('LD')">
        <img class="category-image"
             src="../assets/nav-LD.png">
        <p class="category-desc">
          法律服务
        </p>
      </div>
      <div class="category"
           v-on:click="jumpToClassification('FC')">
        <img class="category-image"
             src="../assets/nav-FC.png">
        <p class="category-desc">
          财税服务
        </p>
      </div>
      <div class="category"
           v-on:click="jumpToClassification('HR')">
        <img class="category-image"
             src="../assets/nav-HR.png">
        <p class="category-desc">
          人事服务
        </p>
      </div>
    </div>
    <div id="recommends" class="clearfix">
      <lh-block-header name="精品推荐"
                       style="padding-left: 5px; padding-right: 5px;"></lh-block-header>
      <div class="recommend-first">
        <lh-product class="recommend-first-product"
                    :cover="item.cover"
                    :name="item.name"
                    :price="item.price"
                    @click="jumpToDetail(item.serialId)"
                    :coverHeight="(screenWidth - 20) / 2 * 0.8"
                    v-for="item in hotProducts.slice(0, 2)">
        </lh-product>
      </div>
      <div class="recommend-second">
        <lh-product class="recommend-second-product"
                    :cover="item.cover"
                    :name="item.name"
                    :price="item.price"
                    @click="jumpToDetail(item.serialId)"
                    :coverHeight="(screenWidth - 20) / 3 * 0.8"
                    v-for="item in hotProducts.slice(2, 5)">
        </lh-product>
      </div>
    </div>
    <div id="hot-products" class="clearfix">
      <lh-block-header name="套餐服务"></lh-block-header>
      <lh-table-entry v-for="item in combos"
                      :name="item.name"
                      :cover="item.cover"
                      :summary="item.summary"
                      @click="jumpToDetail(item.serialId)"
                      :price="item.price">
      </lh-table-entry>
    </div>
  </div>
</template>

<script>
  import productApi from '../api/product'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        screenWidth: window.screen.width,
        combos: [],
        slides: [
          {
            image: '',
            url: ''
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'getRegion',
        'hotProducts'
      ])
    },
    methods: {
      jumpToClassification(code) {
        this.$router.push({name: 'product-classification', params: {classificationCode: code}})
      },
      jumpToDetail(serialId) {
        this.$router.push({name: 'product-detail', params: {serialId: serialId}})
      }
    },
    mounted() {
      let vm = this
      productApi.getProductList(this.getRegion, 'PS', (data) => {vm.combos = data}, error => {})
    }
  }
</script>

<style scoped>
  #home {
    background: #eee;
    padding-top: 50px;
    padding-bottom: 50px;
    min-height: 100%;
  }

  #slides {
    height: 200px;
  }

  .slide {
    background-color: #eee;
  }

  #categories {
    display: flex;
  }

  .category {
    flex: 1;
    text-align: center;
    background: white;
    padding-top: 10px;
  }

  .category-image {
    width: 80%;
  }

  .category-desc {
    margin-top: 5px;
    font-size: 13px;
    padding-bottom: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 15px;
  }

  #recommends {
    background: white;
    padding: 0 5px;
  }

  .recommend-second {
    background: #000;
  }

  .recommend-first-product {
    width: 50%;
  }

  .recommend-second-product {
    width: 33.3%;
  }

  #hot-products {
    background: white;
    padding: 0 10px;
  }
</style>
