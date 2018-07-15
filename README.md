# vue-demo
一个完善的Webpack+Vue + elementui集成开发环境,支持热加载,支持多页面入口的Webpack打包

## 开发环境准备

* **nodejs安装**

下载window安装包[node-v8.10.0](http://yum.longcloud.tech:99/release/software/node-v8.10.0-x64.msi)。
下载完后，双击默认安装即可。

nodejs学习文档，请点击[这里](http://nodejs.cn/api/)。

nodejs发展历史，介绍的不错。请点击[这里](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501245426ad4b91f2b880464ba876a8e3043fc8ef000)。

安装好后，打开命令行，执行````node --version````查看版本号。

* **安装项目所需依赖**

执行命令````npm install````。如果安装比较慢或者未能正常安装，请使用淘宝镜像安装。
````npm install --registry https://registry.npm.taobao.org ````。

# 运行

需要先运行
````npm run build:dll````将各个模块所需的公共的文件（如vue.js）整合成一个文件引入，提升打包速度，
会生成一个public文件夹，含有vendor.dll.js文件和一个对应的json文件

然后执行
````npm run dev````即可

打包压缩需要运行
````npm run build````

# 访问

打开浏览器输入地址````http://localhost:8080````即可访问，默认访问的是index.html
如需访问其他模块可直接加入口文件名，如````http://localhost:8080/paas.html````

# 新增mockjs

添加mockjs，生成模拟数据，完整的增删改查的例子````http://localhost:8080/paas.html````
