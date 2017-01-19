\<template>
  <div id="carts">
    <lh-page-header :hasBack=false
                    title="购物车"></lh-page-header>
    <lh-home-footer :index="3"></lh-home-footer>
    <lh-loading v-if="isLoading"></lh-loading>
    <div v-else>
      <lh-no-things v-if="carts.length == 0"
                    message="购物车为空">
        <img src="../assets/empty-cart.png" style="width: 110px; height: 110px;">
      </lh-no-things>
      <div style="padding-bottom: 50px;"
           v-else>
        <div id="carts-header">
          <div class="choice"
               v-bind:class="{ active: isAllSelected }"
               v-on:click="selectAll()"></div>
          <span>全选</span>
          <div style="margin-left: auto;"
               v-on:click="handleDeleteButton">
            <img src="../assets/delete.png"
                 id="delete-icon">
            <span style="color: #666;">删除</span>
          </div>
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
        <lh-cart-detail :form="form"
                        @confirm="handleConfirmButton"
                        ref="details"></lh-cart-detail>
      </div>
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
      <div id="bottom-button"
           v-bind:class="{active: canCheckout}"
           v-on:click="handleCheckoutButton">结 算
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  export default {
    data () {
      return {
        isLoading: true,
        error: null,
        carts: [],
        form: {
          id: '',
          amount: 1,
          member: 1,
          premium: 0,
          serialId: '',
          regionCode: '',
          region: '',
          product: {
            name: '',
            serialId: '',
            cover: 'logo.png',
            summary: '',
            unitPrice: 0,
            minMember: 1
          }
        },
        selection: []
      }
    },
    methods: {
      isSelected (index) {
        return this.selection.findIndex(item => item === index) > -1
      },
      select (index) {
        let i = this.selection.findIndex(item => item === index)
        if (i < 0) {
          this.selection.push(index)
          this.selection.sort()
        } else {
          this.selection.splice(i, 1)
        }
      },
      selectAll () {
        if (this.selection.length === this.carts.length) {
          this.selection = []
        } else {
          this.selection = []
          for (let i of [...Array(this.carts.length).keys()]) {
            this.selection.push(i)
          }
        }
      },
      openDetails (index) {
        this.form = this.carts[index]
        this.form.product = this.carts[index].product
        this.$refs.details.open()
      },
      handleCheckoutButton () {
        if (this.selection.length === 0) return
        var form = []
        for (let i of this.selection.reverse()) {
          form.push(this.carts[i])
        }
        this.$store.commit('CHECKOUT', form)
        this.$router.push({name: 'checkout'})
      },
      handleDeleteButton () {
        if (this.selection.length === 0) return
        let vm = this
        MessageBox.confirm('确认从购物车中移除吗？').then(
          action => {
            let cartIds = []
            for (let i of vm.selection) {
              cartIds.push(vm.carts[i].id)
            }
            vm.$store.dispatch('removeCart', cartIds).then(
              data => {
                let selections = vm.selection.slice()
                selections.sort().reverse()
                vm.selection = []
                for (let i of selections) {
                  vm.carts.splice(i, 1)
                }
              },
              () => {}
            )
          },
          () => {}
        )
      },
      handleConfirmButton () {
        let vm = this
        this.$store.dispatch('updateCart', this.form).then(
          data => {
            vm.$refs.details.close()
          },
          () => {}
        )
      }
    },
    computed: {
      isAllSelected () {
        return this.selection.length === this.carts.length
      },
      totalAmount () {
        return this.selection.length
      },
      totalPrice () {
        var total = 0
        for (let i of this.selection) {
          let member = this.carts[i].member - this.carts[i].product.minMember
          if (member > 0) {
            total += this.carts[i].amount * (this.carts[i].product.unitPrice + this.carts[i].product.perPrice * (this.carts[i].member - this.carts[i].product.minMember)) + this.carts[i].premium
          } else {
            total += this.carts[i].amount * this.carts[i].product.unitPrice + this.carts[i].premium
          }
        }
        return total.toFixed(2)
      },
      canCheckout () {
        return this.selection.length > 0
      }
    },
    created () {
      let vm = this
      this.$store.dispatch('getCarts', 1).then(
        data => {
          vm.carts = data.content
          for (let i of [...Array(vm.carts.length).keys()]) {
            this.selection.push(i)
          }
          vm.isLoading = false
        },
        error => {
          vm.error = error
        }
      )
    }
  }
</script>

<style scoped>
  #carts {
    padding-top: 44px;
    padding-bottom: 44px;
    min-height: 100%;
    background-color: #f9f9f9;
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
    height: 20px;
    width: 20px;
    vertical-align: middle;
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
    bottom: 44px;
    width: 100%;
    height: 50px;
    z-index: 99;
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
    background: #aaa;
    height: 100%;
    line-height: 54px;
    color: white;
    font-size: 18px;
    text-align: center;
    flex: 1;
  }

  #bottom-button.active {
    background: #199cd8;
  }

  b {
    color: red;
    font-size: 20px;
    font-weight: 700;
    font-family: arial, serif;
  }
</style>
