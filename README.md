# qiyewan-site-mobile

> 基于 Vue.js 框架搭建的企业湾·官网移动端 Web App.

### 运行环境

整体框架：

> Vue + Vuex + Vue-Router + Vue-Resource + Mint-UI

前三个依赖均为官方推荐的库/框架，有详细的文档（包括中文），在此不再赘述。

Vue-Resource 虽然不是官方提供的，但因为用法简单，所以也不再详述。

Mint-UI 是饿了么的 FE 团队开源的基于 Vue.js 的 CSS 样式库，详细用法参考他们的官网。

### 构建

``` bash
# 安装依赖。
npm install

# 运行“开发”环境，开启8080端口的静态服务。
npm run dev

# 进行构建，运行结果在 dist/ 目录下。
npm run build

# 运行部署，直接将构建结果上传到正式服务器的有效目录中。
npm run deploy
```

