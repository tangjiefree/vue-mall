# vue-mall

> 移动端小商城
技术栈 vue全家桶+koa+mongodb+mint-ui (后期考虑ui换成vant)

## Build Setup 运行前端项目

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 后端项目启动方法(需要本地安装mongodb数据库)

``` bash
# 进入server文件夹
npm install

# 启动后台
node index.js

#启动服务器
mongod

#分别访问appApi中goods.js下的路径将文件添加进入数据库即可

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
