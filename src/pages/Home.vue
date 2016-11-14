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
    <div id="categories">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slides: [
          {
            image: "",
          },
          {
            image: "",
          },
          {
            image: "",
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

<style scoped>
  #slides {
    height: 200px;
  }

  .slide {
    background-color: gray;
  }

  #categories {
    margin-top: 10px;
  }
  .category {
    width: 20%;
    float: left;
    text-align: center;
  }
  .category-image {
    width: 80%;
  }
  .category-desc {
    margin-top: 5px;
    font-size: 13px;
  }
</style>
