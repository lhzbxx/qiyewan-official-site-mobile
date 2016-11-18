<template>
  <div id="carts">
    <div id="carts-header">
      <div class="choice"></div>
      <span>全选</span>
      <img src="../assets/logo.png"
           id="delete-icon">
      <span>删除</span>
    </div>
    <div class="cart"
         v-for="item in hot_products">
      <div class="choice"></div>
      <lh-table-entry :name="item.name"
                      :cover="item.cover"
                      :summary="item.summary"
                      :price="item.price"
                      :amount="item.amount"
                      :unit="item.unit"
                      style="padding-left: 10px;">
      </lh-table-entry>
    </div>
    <div id="bottom">
      <div class="bottom-info" style="min-width: 150px;">
        <span style="font-size: 16px;">总计</span>
        <span style="color: red;">
          <span style="font-size: 10px;">&yen;</span><b>10000.00</b>
        </span>
      </div>
      <div class="bottom-info" style="max-width: 90px;">
        <span>已选</span>
        <span><b>24</b> 个</span>
      </div>
      <div id="bottom-button">结 算
      </div>
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
            price: 100,
            amount: 6,
            unit: "月"
          },
          {
            name: "注册财税一条龙",
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            summary: "注册+银行开户+核定税种（税务报到+代购CA+代拿三方）+一年代账（零申报），报价中不含官费。",
            price: 100,
            amount: 18,
            unit: "个"
          },
          {
            name: "注册财税一条龙",
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            summary: "注册+银行开户+核定税种（税务报到+代购CA+代拿三方）+一年代账（零申报），报价中不含官费。",
            price: 100,
            amount: 6,
            unit: "月"
          },
          {
            name: "注册财税一条龙",
            cover: "http://ofw6tmkxn.bkt.clouddn.com/finance_02.jpg",
            summary: "注册+银行开户+核定税种（税务报到+代购CA+代拿三方）+一年代账（零申报），报价中不含官费。",
            price: 100,
            amount: 6,
            unit: "月"
          }
        ],
        selection: []
      }
    },
    methods: {
      isSelected(index) {
        return this.selection.findIndex(item => item == index) > -1
      }
    }
  }
</script>

<style scoped>
  #carts {
    background: #f9f9f9;
    padding-top: 15px;
    padding-bottom: 1px;
  }

  #carts-header {
    padding: 0 10px;
    height: 44px;
    background-color: white;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .choice {
    min-width: 20px;
    min-height: 20px;
    margin: 0 5px;
    background-image: url('../assets/logo.png');
    background-size: 100%;
  }

  .choice.active {
    background-image: url('../assets/mobile-icon-hot.png');
  }

  #delete-icon {
    margin-left: auto;
    height: 20px;
    width: 20px;
  }

  .cart {
    background: #f9f9f9;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin: 0 10px 10px;
  }

  #bottom {
    display: flex;
    position: fixed;
    align-items: baseline;
    justify-content: flex-end;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 100;
    background: white;
  }

  .bottom-info {
    border-top: 1px solid #eee;
    height: 100%;
    line-height: 50px;
    text-align: center;
    flex: 1;
  }

  #bottom-button {
    background: #199cd8;
    height: 100%;
    line-height: 50px;
    color: white;
    font-size: 18px;
    text-align: center;
    flex: 1;
  }

  b {
    color: red;
    font-size: 20px;
    font-weight: 700;
    font-family: arial, serif;
  }
</style>
