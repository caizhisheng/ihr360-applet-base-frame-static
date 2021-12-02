

## 支持rem
  1rem = 100px


## 启动
```
 1. npm install 根据依赖安装包

 2. npm start  启动项目 默认3000端口

 3. npm run build 上线编译打包项目
```

## 说明
```
该项目使用的依赖包情况：
1、启动和打包：ihr360-config-plugin
  a. 支持对webpack做部分自定义，详见：https://wiki.ihr360.com/pages/viewpage.action?pageId=28051516
  b. 相关环境变量设置在：.env - 设置公共环境变量    .env.development：设置开发环境专用变量    .env.production：设置生产环境专用变量
  c. 代码提交遵循git-hook规范，详见根目录commitlint.config.js文件
2、组件库：ihr360-web-ui
3、工具包：irs-tools
```



