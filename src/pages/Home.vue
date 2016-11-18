<style scoped>
  #home {
    margin-bottom: 60px;
    background: #eee;
  }

  #slides {
    height: 200px;
  }

  .slide {
    background-color: gray;
  }

  .category {
    width: 20%;
    float: left;
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
  }

  .recommend-first {
    padding: 0 5px;
  }

  .recommend-second {
    padding: 0 5px;
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
  }
</style>

<template>
  <div id="home">
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
      <lh-block-header name="精品推荐"></lh-block-header>
      <div class="recommend-first">
        <lh-product class="recommend-first-product"
                    :cover="item.cover"
                    :name="item.name"
                    :price="item.price"
                    v-for="item in recommends.slice(0, 2)">
        </lh-product>
      </div>
      <div class="recommend-second">
        <lh-product class="recommend-second-product"
                    :cover="item.cover"
                    :name="item.name"
                    :price="item.price"
                    v-for="item in recommends.slice(2)">
        </lh-product>
      </div>
    </div>
    <div id="hot-products" class="clearfix">
      <lh-block-header name="套餐服务"></lh-block-header>
      <lh-table-entry v-for="item in hot_products"
                      :name="item.name"
                      :cover="item.cover"
                      :summary="item.summary"
                      :price="item.price">
      </lh-table-entry>
    </div>
  </div>
</template>

<script>
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
        recommends: [
          {
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            name: "税务报到，税种认定",
            price: 10
          },
          {
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            name: "税务报到，税种认定",
            price: 10
          },
          {
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            name: "税务报到，税种认定",
            price: 10
          },
          {
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            name: "税务报到，税种认定，测试过长的情况",
            price: 10
          },
          {
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            name: "税务报到，税种认定",
            price: 10
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
    }
  }
</script>
