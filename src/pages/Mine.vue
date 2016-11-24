<template>
  <div id="mine">
    <lh-page-header :hasBack=false
                    title="个人中心"></lh-page-header>
    <lh-home-footer :index="4"></lh-home-footer>
    <div class="auth" id="has-auth">
      <img src="" alt="avatar">
      <p>尼古拉斯`金铜</p>
      <div id="right-arrow"></div>
    </div>
    <div class="auth" id="no-auth">
      <router-link to="/auth" class="button">登录</router-link>
      <router-link to="/auth?state=1" class="button">注册</router-link>
    </div>
    <div id="bought">
      <div class="bought-block"
           style="border-right: 1px solid #eee;">
        <img src="../assets/logo.png">
        <span>使用中</span>
      </div>
      <div class="bought-block">
        <img src="../assets/logo.png">
        <span>待评价</span></div>
    </div>
    <div class="block">
      <mt-cell
        title="购物车"
        to="/cart"
        is-link>
        <!--todo: 替换icon！-->
        <img slot="icon"
             src="../assets/logo.png"
             class="cell-icon"
             width="28"
             style="margin-right: 3px;">
      </mt-cell>
      <mt-cell
        title="订单"
        to="/order"
        is-link>
        <img slot="icon"
             src="../assets/logo.png"
             class="cell-icon"
             width="28"
             style="margin-right: 3px;">
      </mt-cell>
    </div>
    <div class="block">
      <mt-cell
        title="关于我们"
        to="订单"
        is-link>
        <img slot="icon"
             src="../assets/logo.png"
             class="cell-icon"
             width="28"
             style="margin-right: 3px;">
      </mt-cell>
      <mt-cell
        title="联系我们"
        to="订单"
        is-link>
        <img slot="icon"
             src="../assets/logo.png"
             class="cell-icon"
             width="28"
             style="margin-right: 3px;">
      </mt-cell>
    </div>
    <div style="margin: 15px 10px 0;">
      <mt-button type="primary"
                 id="submitButton"
                 size="large">
        退出登录
      </mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped>
  #mine {
    padding-top: 65px;
    padding-bottom: 50px;
    background: #fafafa;
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
    height: 24px;
    margin-right: 8px;
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

  .button {
    padding: 6px 30px;
    margin: 0 15px;
    line-height: 20px;
    font-size: 16px;
    color: #26a2ff;
    border: 1px solid #26a2ff;
    border-radius: 20px;
    font-weight: 500;
    text-decoration: none;
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
