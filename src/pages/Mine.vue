<template>
  <div id="mine">
    <lh-page-header :hasBack=false
                    title="个人中心">
    </lh-page-header>
    <lh-home-footer :index="4"></lh-home-footer>
    <div class="auth" id="has-auth" v-if="isLogin">
      <img :src="getAuth.avatar ? getAuth.avatar : 'avatar.png' | cdn-filter" alt="avatar">
      <p>{{ getAuth.nickname ? getAuth.nickname : '昵称' }}</p>
      <!--<div id="right-arrow"></div>-->
    </div>
    <div class="auth" id="no-auth" v-else>
      <router-link to="/auth" class="link button">登录</router-link>
      <router-link to="/auth?state=1" class="link button">注册</router-link>
    </div>
    <div id="bought">
      <div class="bought-block"
           style="border-right: 1px solid #eee;">
        <img src="../assets/service-node.png">
        <router-link to="/service"
                     class="link">服务节点
        </router-link>
      </div>
      <div class="bought-block">
        <img src="../assets/unreviewed.png">
        <router-link to="/order?state=2"
                     class="link">待评价
        </router-link>
      </div>
    </div>
    <div class="block">
      <mt-cell class="row"
               title="购物车"
               to="/cart"
               is-link>
        <!--<img slot="icon" -->
             <!--src="../assets/cart.png"-->
             <!--class="cell-icon"-->
             <!--width="28"-->
             <!--style="margin-right: 3px;">-->
      </mt-cell>
      <mt-cell class="row"
               title="订单"
               to="/order"
               is-link>
        <!--<img slot="icon"-->
             <!--src="../assets/order.png"-->
             <!--class="cell-icon"-->
             <!--width="28"-->
             <!--style="margin-right: 3px;">-->
      </mt-cell>
      <mt-cell class="row"
               title="浏览记录"
               to="/browsing-history"
               is-link>
        <!--<img slot="icon"-->
             <!--src="../assets/history.png"-->
             <!--class="cell-icon"-->
             <!--width="28"-->
             <!--style="margin-right: 3px;">-->
      </mt-cell>
    </div>
    <div class="block">
      <mt-cell class="row"
               title="关于我们"
               to="/about-us"
               is-link>
        <!--<img slot="icon"-->
             <!--src="../assets/logo.png"-->
             <!--class="cell-icon"-->
             <!--width="28"-->
             <!--style="margin-right: 3px;">-->
      </mt-cell>
      <mt-cell class="row"
               title="联系我们"
               to="/contact-us"
               is-link>
        <!--<img slot="icon"-->
             <!--src="../assets/contact-us.png"-->
             <!--class="cell-icon"-->
             <!--width="28"-->
             <!--style="margin-right: 3px;">-->
      </mt-cell>
    </div>
    <div style="margin: 15px 10px 10px;"
         v-if="isLogin">
      <mt-button type="primary"
                 id="submitButton"
                 @click.native="logout"
                 size="large">
        退出登录
      </mt-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'getAuth'
      ])
    },
    methods: {
      logout () {
        this.$store.commit('USER_LOGOUT')
      }
    },
    created () {
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style scoped>
  #mine {
    padding-top: 59px;
    padding-bottom: 44px;
    background: #fafafa;
    min-height: 100%;
  }

  #bought {
    height: 55px;
    display: flex;
    align-items: center;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: white;
  }

  .bought-block {
    text-align: center;
    height: 25px;
    flex: 1;
  }

  .bought-block img {
    vertical-align: middle;
    width: 16px;
    height: 14px;
  }

  .bought-block span {
    line-height: 25px;
    font-size: 17px;
  }

  .block {
    margin-top: 15px;
  }

  .auth {
    height: 70px;
    background: white;
    border-top: 1px solid #ddd;
    display: flex;
    align-items: center;
  }

  #no-auth {
    justify-content: center;
    height: 119px;
    background-color: #00A1E8;
    margin-top: -14px;
  }

  #has-auth img {
    width: 50px;
    height: 50px;
    border: 2px solid #eee;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }

  #has-auth {
    padding-left: 30px;
    position: relative;
  }

  .link {
    text-decoration: none;
    color: #8D8D8D;
    font-size: 15px;
    line-height: 25px;
  }

  .button {
    color: #fff;
    margin: 0 15px;
    line-height: 20px;
    font-size: 16px;
    border: 1px solid #fff;
    border-radius: 20px;
    width: 92px;
    height: 28px;
    text-align: center;
    padding: 3px;
  }

  .row {
    color: #8D8D8D;
    font-size: 15px;
  }

  #right-arrow:after {
    border: solid 3px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 25px;
    position: absolute;
    width: 10px;
    height: 10px;
    transform: translateY(-50%) rotate(45deg);
  }

  .cell-icon {
    width: 28px;
    margin-right: 3px;
  }
</style>
