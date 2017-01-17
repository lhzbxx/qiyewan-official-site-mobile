<template>
  <div id="home">
    <lh-home-header></lh-home-header>
    <lh-home-footer :index="1"></lh-home-footer>
    <lh-customer-service></lh-customer-service>
    <mt-swipe v-bind:style="{ height: bannerHeight + 'px' }"
              :auto="4000"
              :show-indicators="true">
      <mt-swipe-item class="slide"
                     v-bind:style="{ height: bannerHeight + 'px' }"
                     v-for="(item, index) in slides">
        <router-link
          :to="{ name: 'product-detail', params: { serialId: getRegion.code + item.serialId }}">
          <img :src="item.image | cdn-filter" :alt="index" width="100%">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <div id="categories"
         class="clearfix"
         v-once>
      <div class="category"
           v-on:click="jumpToClassification('IC')">
        <img class="category-image"
             src="../assets/nav-IC.png">
        <p class="category-desc">
          工商服务
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
           v-on:click="jumpToClassification('LD')">
        <img class="category-image"
             src="../assets/nav-LD.png">
        <p class="category-desc">
          法律服务
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
      <div class="category"
           v-on:click="jumpToClassification('IT')">
        <img class="category-image"
             src="../assets/nav-IT.png">
        <p class="category-desc">
          IT&设计
        </p>
      </div>
    </div>
    <div id="recommends"
         class="clearfix"
         v-once>
      <lh-block-header name="精品推荐"
                       style="padding-left: 5px; padding-right: 5px;"></lh-block-header>
      <div class="recommend-first">
        <lh-product class="recommend-first-product"
                    :cover="item.cover"
                    :name="item.name"
                    :price="item.price"
                    @click="jumpToDetail(getRegion.code + item.serialId)"
                    :coverHeight="(screenWidth - 20) / 2 * 0.75"
                    v-for="item in hotProducts.slice(0, 2)">
        </lh-product>
      </div>
      <div class="recommend-second">
        <lh-product class="recommend-second-product"
                    :cover="item.cover"
                    :name="item.name"
                    :price="item.price"
                    @click="jumpToDetail(getRegion.code + item.serialId)"
                    :coverHeight="(screenWidth - 20) / 3 * 0.8"
                    v-for="item in hotProducts.slice(2, 5)">
        </lh-product>
      </div>
    </div>
    <div id="hot-products" class="clearfix">
      <lh-block-header name="套餐服务" :isMore="false"></lh-block-header>
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
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        error: null,
        screenWidth: window.screen.width,
        combos: [],
        slides: [
          {
            serialId: 'FC0001',
            image: 'mobile-banner-1.jpg'
          },
          {
            serialId: 'IC0001',
            image: 'mobile-banner-2.jpg'
          },
          {
            serialId: 'IC0001',
            image: 'mobile-banner-3.jpg'
          },
          {
            serialId: 'FC0001',
            image: 'mobile-banner-4.jpg'
          },
          {
            serialId: 'LD0001',
            image: 'mobile-banner-5.jpg'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'getRegion',
        'hotProducts'
      ]),
      bannerHeight () {
        return this.screenWidth * 320 / 750
      }
    },
    watch: {
      'getRegion': 'fetchPS'
    },
    methods: {
      jumpToClassification (code) {
        this.$router.push({name: 'product-classification', params: {classificationCode: code}})
      },
      jumpToDetail (serialId) {
        this.$router.push({name: 'product-detail', params: {serialId: serialId}})
      },
      fetchPS () {
        let vm = this
        this.$store.dispatch('getProductList', 'PS').then(
          data => {
            vm.combos = data
          },
          error => {
            vm.error = error
          }
        )
      }
    },
    mounted () {
      this.fetchPS()
    }
  }
</script>

<style scoped>
  #home {
    background: #eee;
    padding-top: 44px;
    padding-bottom: 44px;
    min-height: 100%;
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
    padding-top: 17px;
  }

  .category-image {
    width: 60%;
  }

  .category-desc {
    margin-top: 7px;
    font-size: 12px;
    padding-bottom: 20px;
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
