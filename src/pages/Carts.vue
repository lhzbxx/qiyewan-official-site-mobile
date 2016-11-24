<template>
  <div id="carts">
    <lh-page-header :hasBack=false
                    title="购物车"></lh-page-header>
    <lh-home-footer :index="3"></lh-home-footer>
    <lh-loading v-if="isLoading"></lh-loading>
    <div v-else>
      <lh-no-things v-if="carts.length == 0"></lh-no-things>
      <div v-else>
        <div id="carts-header">
          <div class="choice"
               v-bind:class="{ active: isAllSelected }"
               v-on:click="selectAll()"></div>
          <span>全选</span>
          <img src="../assets/logo.png"
               id="delete-icon">
          <span>删除</span>
        </div>
        <div class="cart"
             v-for="(item, index) in carts">
          <div class="choice"
               v-on:click="select(index)"
               v-bind:class="{ active: isSelected(index) }"></div>
          <lh-table-entry :name="item.product.name"
                          :cover="item.product.cover"
                          :summary="item.product.summary"
                          :price="item.product.unitPrice"
                          :amount="item.amount"
                          :unit="item.product.unit"
                          :isSplit=false
                          @click="openDetails(index)"
                          style="padding-left: 10px;">
          </lh-table-entry>
        </div>
      </div>
      <lh-cart-detail :form="form"
                      :product="product"
                      ref="details"></lh-cart-detail>
    </div>
    <div id="bottom"
         v-if="carts.length > 0">
      <div class="bottom-info" style="min-width: 150px;">
        <span style="font-size: 16px;">总计</span>
        <span style="color: red;">
          <span style="font-size: 10px;">&yen;</span><b>{{ totalPrice }}</b>
        </span>
      </div>
      <div class="bottom-info" style="max-width: 90px;">
        <span>已选</span>
        <span><b>{{ totalAmount }}</b> 个</span>
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
        isLoading: true,
        carts: [],
        form: {
          id: '',
          amount: 1,
          member: 1,
          serialId: '',
          regionCode: '',
          region: '',
          product: {
            name: '',
            cover: 'logo.png',
            summary: '',
            unitPrice: 0
          }
        },
        selection: []
      }
    },
    methods: {
      isSelected(index) {
        return this.selection.findIndex(item => item == index) > -1
      },
      select(index) {
        let i = this.selection.findIndex(item => item == index)
        if (i < 0) {
          this.selection.push(index)
          this.selection.sort()
        } else {
          this.selection.splice(i, 1)
        }
      },
      selectAll() {
        if (this.selection.length == this.carts.length) {
          this.selection = []
        } else {
          this.selection = []
          for (let i of [...Array(this.carts.length).keys()]) {
            this.selection.push(i)
          }
        }
      },
      openDetails(index) {
        this.form = this.carts[index]
        this.product = this.carts[index].product
        this.$refs.details.open()
      }
    },
    computed: {
      isAllSelected() {
        return this.selection.length == this.carts.length
      },
      totalAmount() {
        return this.selection.length
      },
      totalPrice() {
        var result = 0
        for (let i of this.selection) {
          result += this.carts[i].product.amount * this.carts[i].product.price
        }
        return result
      }
    },
    mounted() {
      for (let i of [...Array(this.carts.length).keys()]) {
        this.selection.push(i)
      }
    }
  }
</script>

<style scoped>
  #carts {
    padding-top: 50px;
    padding-bottom: 1px;
    background: #f9f9f9;
    min-height: 100%;
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
    background-image: url('../assets/unchosen.png');
    background-size: 100%;
  }

  .choice.active {
    background-image: url('../assets/chosen.png');
  }

  #delete-icon {
    margin-left: auto;
    height: 20px;
    width: 20px;
  }

  .cart {
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
    bottom: 50px;
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
