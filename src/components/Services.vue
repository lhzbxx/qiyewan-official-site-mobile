<template>
  <div id="service-list">
    <div class="service" v-for="item in services">
      <img src="../assets/node.png" alt="">
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        services: [
          {
            name: '一站式服务',
            icon: ''
          },
          {
            name: '实时短信',
            icon: ''
          },
          {
            name: '实时提醒',
            icon: ''
          },
          {
            name: '一对一服务',
            icon: ''
          }
        ]
      }
    }
  }
</script>

<style scoped>
  #service-list {
    margin-top: -1px;
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .service {
    flex: 1;
    height: 40px;
    text-align: center;
  }

  .service img {
    height: 14px;
    width: 14px;
    display: inline-block;
    vertical-align: middle;
  }

  .service p {
    font-size: 12px;
    display: inline-block;
    line-height: 40px;
  }
</style>
