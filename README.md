## 启动
```
 1. npm install 根据依赖安装包

 2. npm start  启动项目 默认3000端口

 3. npm run build-xxx 上线编译打包项目(区分环境及语言，具体参考package.json)

```

## 内部依赖包说明
```
1. 组件库：ihr360-web-ui3 组件库文档地址：http://ihr-ui.ihr360.com/v_3.x/
2. 打包配置：ihr360-config-plugin（包含webpack4打包配置、ts校验配置、git hooks校验、babel配置等）
3. 工具包：irs-tools（包含前端数据存储、微服务下共享信息通信、fetch请求、jsBridge、打印预览、水印、agent判断等）
4. React相关版本均采用16.x.x版本（禁止单独升级版本）
```

## 注意
```
1. 开发需要支持国际化
2. 颜色值需要使用变量方式，支持换肤
3. 全局公共变量需定义到.env文件中，如需区分环境需在env.development或.env.production中分别定义
4. 项目webpack打包配置均已集成到配置中心，如需要拓展额外的配置可以在config-overrides.js文件中根据暴露的出口适时添加
5. git commit message需按要求提交(可参考commitlint.config.js文件)
6. 全局数据流需按要求采用Redux进行统一管理，可参考项目中的demo样例

```

## 交付自测功能点
```
1. 业务功能
2. 全局水印功能
3. 全局换肤功能
4. 全局国际化功能
```

