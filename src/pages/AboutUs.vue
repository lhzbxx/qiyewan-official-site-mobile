<template>
  <div id="about-us">
    <lh-page-header title="关于我们"></lh-page-header>
    <img :src="'wechat_about-us.png' | cdn-filter" style="width: 100%;">
    <div id="content">
      <h3>企业湾</h3>
      <p>
        企业湾（www.qiyewan.com）是国内领先的专注于中小企业服务的一站式综合服务体。由伯藜基金、哈佛校友投资创建，通过整合业内优秀的财务、法务、人事、IT技术等资源，汇聚中国广大的优秀大学生和专业的退休人员；利用移动互联网和云端技术，通过线下线下的服务方式，优化服务流程，降低服务成本。为中国千万中小企业、创新创业者提供一站超值的服务。核心团队主要由上市公司高管，资深财务、法务、人力资源负责人以及国内知名互联网企业的精英组成。</p>
      <h3>企业文化</h3>
      <h6>企业湾的使命</h6>
      <p>重塑中国企业服务和专业高等教育实践的生态</p>
      <h6>企业湾的愿景</h6>
      <p>成为从业人员最多、最具有活力的专业服务机构</p>
      <h6>企业湾的战略</h6>
      <p>·聚焦小微企业的需求</p>
      <p>·借助高校相关资源</p>
      <p>·弘扬企业家精神</p>
      <p>·强大的过程能力保证绩效和扩张</p>
      <h6>企业湾的服务承诺</h6>
      <p>一站、超值、快速响应</p>
    </div>
  </div>
</template>

<style scoped>
  #about-us {
    padding-top: 44px;
    background: #fafafa;
  }

  #content {
    padding: 0 10px;
  }

  h3 {
    font-size: 18px;
    line-height: 40px;
    color: #f29600;
  }

  h6 {
    font-size: 15px;
    line-height: 20px;
  }

  p {
    font-size: 13px;
    line-height: 15px;
  }
</style>
