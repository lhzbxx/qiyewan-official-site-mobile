<template>
  <div id="home">
    <lh-home-header></lh-home-header>
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
           v-on:click="jumpToClassification(item.code)"
           v-for="item in categories">
        <img class="category-image"
             :src="item.image"
             :alt="item.name">
        <p class="category-desc">
          {{ item.name }}
        </p>
      </div>
    </div>
    <div id="recommends" class="clearfix">
      <lh-block-header name="精品推荐"
                       style="padding-left: 5px; padding-right: 5px;"></lh-block-header>
      <div class="recommend-first">
        <lh-product class="recommend-first-product"
                    :cover="cdnPrefix + item.cover"
                    :name="item.name"
                    :price="item.price"
                    @click="jumpToDetail(item.serialId)"
                    v-for="item in hotProducts.slice(0, 2)">
        </lh-product>
      </div>
      <div class="recommend-second">
        <lh-product class="recommend-second-product"
                    :cover="cdnPrefix + item.cover"
                    :name="item.name"
                    :price="item.price"
                    @click="jumpToDetail(item.serialId)"
                    v-for="item in hotProducts.slice(2, 5)">
        </lh-product>
      </div>
    </div>
    <div id="hot-products" class="clearfix">
      <lh-block-header name="套餐服务"></lh-block-header>
      <lh-table-entry v-for="item in hot_products"
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
    data() {
      return {
        hot_products: [
          {
            name: "注册财税一条龙",
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            summary: "注册+银行开户+核定税种（税务报到+代购CA+代拿三方）+一年代账（零申报），报价中不含官费。",
            price: 100
          },
          {
            name: "注册财税一条龙",
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            summary: "注册+银行开户+核定税种（税务报到+代购CA+代拿三方）+一年代账（零申报），报价中不含官费。",
            price: 100
          },
          {
            name: "注册财税一条龙",
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            summary: "注册+银行开户+核定税种（税务报到+代购CA+代拿三方）+一年代账（零申报），报价中不含官费。",
            price: 100
          },
          {
            name: "注册财税一条龙",
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            summary: "注册+银行开户+核定税种（税务报到+代购CA+代拿三方）+一年代账（零申报），报价中不含官费。",
            price: 100
          }
        ],
        slides: [
          {
            image: '',
            url: ''
          },
          {
            image: '',
            url: ''
          },
          {
            image: '',
            url: ''
          }
        ],
        categories: [
          {
            name: '工商服务',
            image: 'http://ofw6tmkxn.bkt.clouddn.com/mobile-category-IC.png',
            code: 'IC'
          },
          {
            name: 'IT&设计',
            image: 'http://ofw6tmkxn.bkt.clouddn.com/mobile-category-IC.png',
            code: 'IT'
          },
          {
            name: '法律服务',
            image: 'http://ofw6tmkxn.bkt.clouddn.com/mobile-category-IC.png',
            code: 'LD'
          },
          {
            name: '财税服务',
            image: 'http://ofw6tmkxn.bkt.clouddn.com/mobile-category-IC.png',
            code: 'FC'
          },
          {
            name: '人事服务',
            image: 'http://ofw6tmkxn.bkt.clouddn.com/mobile-category-IC.png',
            code: 'HR'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'cdnPrefix',
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
    }
  }
</script>

<style scoped>
  #home {
    background: #eee;
    margin-top: 50px;
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
