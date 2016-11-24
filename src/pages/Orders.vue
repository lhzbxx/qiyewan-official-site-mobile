<template>
  <div id="orders">
    <lh-page-header :hasBack=false
                    title="订 单"></lh-page-header>
    <lh-home-footer :index="2"></lh-home-footer>
    <lh-tabs-header :tabs="orderState"
                    @change-current="changeCurrent"></lh-tabs-header>
    <div id="no-orders"
         v-if="orders.length == 0">
      <img src="../assets/logo.png" alt="暂无">
      <br>
      <mt-button type="primary"
                 size="small">
        去逛逛
      </mt-button>
    </div>
    <div v-for="order in orders"
         id="order">
      <lh-order-header :serialId="order.serialId"
                       :createAt="order.createAt"></lh-order-header>
      <lh-table-entry :name="item.name"
                      :cover="item.cover"
                      :summary="item.summary"
                      :price="item.unitPrice"
                      :amount="item.amount"
                      :unit="item.unit"
                      :isLast="order.details.length == index + 1"
                      class="product"
                      v-for="(item, index) in order.details"
                      @click="openDetails(index)">
      </lh-table-entry>
      <div id="ops-block">
        <p class="button warning" v-if="currentState == 0">删除</p>
        <p class="button" v-if="currentState == 0">去支付</p>
        <p class="button" v-if="currentState == 1">去评价</p>
        <p class="button" v-if="currentState == 2">再来一份</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentState: 0,
        orderState: [
          '未付款',
          '待评价',
          '已完成'
        ],
        orders: [
          {
            "id": 6,
            "userId": 1,
            "serialId": "201611071547103676568",
            "details": [{
              "id": 9,
              "region": "上海-上海-闵行区",
              "regionCode": "SHSH",
              "productSerialId": "SHSHPS0001",
              "name": "注册财税一条龙",
              "amount": 3,
              "unitPrice": 1688.00,
              "unit": "个",
              "summary": "注册+银行开户+核定税种（税务报到+代购 CA+代拿三方）+一年代账（零申报）；报价中不含官费",
              "cover": "product-SHSHPS0001-cover.jpg"
            }],
            "payment": "Alipay",
            "orderState": "Unpaid",
            "totalPrice": 10128.00,
            "createAt": 1478504830026,
            "updateAt": 1478504830026,
            "payUrl": "https://mapi.alipay.com/gateway.do?_input_charset=utf-8&body=SHSHPS0001*3+%2B+SHSHPS0001*3&out_trade_no=201611071547103676568&partner=2088021990129702&payment_type=1&seller_id=2088021990129702&service=create_direct_pay_by_user&show_url=http%3A%2F%2F127.0.0.1%3A8080%2F%23%2Forder&sign=fET4MUTXz20SndYHjC826J4LAn4MgnXmNZGe42JGZBn4a25rVMsYPH6UGf464ruLEEw8LGDvSLCnGAVi2nZAi2U62nri3i2k83dqf7h9kwRmnZGmZBZvdzFqJVpZDrNWAi4a4o%2F0kyyhuSJHhE%2FkZ%2Bghye15lt8aC0XUQqCV1ME%3D&sign_type=RSA&subject=%E6%B3%A8%E5%86%8C%E8%B4%A2%E7%A8%8E%E4%B8%80%E6%9D%A1%E9%BE%99+%2B+%E6%B3%A8%E5%86%8C%E8%B4%A2%E7%A8%8E%E4%B8%80%E6%9D%A1%E9%BE%99&total_fee=10128.00"
          },
          {
            "id": 6,
            "userId": 1,
            "serialId": "201611071547103676568",
            "details": [{
              "id": 9,
              "region": "上海-上海-闵行区",
              "regionCode": "SHSH",
              "productSerialId": "SHSHPS0001",
              "name": "注册财税一条龙",
              "amount": 3,
              "unitPrice": 1688.00,
              "unit": "个",
              "summary": "注册+银行开户+核定税种（税务报到+代购 CA+代拿三方）+一年代账（零申报）；报价中不含官费",
              "cover": "product-SHSHPS0001-cover.jpg"
            }],
            "payment": "Alipay",
            "orderState": "Unpaid",
            "totalPrice": 10128.00,
            "createAt": 1478504830026,
            "updateAt": 1478504830026,
            "payUrl": "https://mapi.alipay.com/gateway.do?_input_charset=utf-8&body=SHSHPS0001*3+%2B+SHSHPS0001*3&out_trade_no=201611071547103676568&partner=2088021990129702&payment_type=1&seller_id=2088021990129702&service=create_direct_pay_by_user&show_url=http%3A%2F%2F127.0.0.1%3A8080%2F%23%2Forder&sign=fET4MUTXz20SndYHjC826J4LAn4MgnXmNZGe42JGZBn4a25rVMsYPH6UGf464ruLEEw8LGDvSLCnGAVi2nZAi2U62nri3i2k83dqf7h9kwRmnZGmZBZvdzFqJVpZDrNWAi4a4o%2F0kyyhuSJHhE%2FkZ%2Bghye15lt8aC0XUQqCV1ME%3D&sign_type=RSA&subject=%E6%B3%A8%E5%86%8C%E8%B4%A2%E7%A8%8E%E4%B8%80%E6%9D%A1%E9%BE%99+%2B+%E6%B3%A8%E5%86%8C%E8%B4%A2%E7%A8%8E%E4%B8%80%E6%9D%A1%E9%BE%99&total_fee=10128.00"
          }
        ]
      }
    },
    methods: {
      changeCurrent(current) {
        console.log(current)
        switch (current) {
          case '未付款':
            this.currentState = 0
            break
          case '待评价':
            this.currentState = 1
            break
          case '已完成':
            this.currentState = 2
            break
        }
      }
    }
  }
</script>

<style scoped>
  #orders {
    padding-top: 50px;
    padding-bottom: 50px;
    background: #f9f9f9;
    min-height: 100%;
  }

  #order {
    margin-top: 10px;
    background: white;
  }

  #ops-block {
    margin-bottom: 10px;
    background: white;
    border-top: 1px solid #eee;
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: row-reverse;
    margin-top: -8px;
  }

  .button {
    margin-right: 15px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #26a2ff;
    font-weight: 500;
    padding: 5px 10px;
    color: #26a2ff;
  }

  .button.warning {
    color: red;
    border-color: red;
  }

  .product {
    padding: 0 10px;
  }
</style>
