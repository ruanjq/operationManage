# 后台管理系统

![项目摘要图](https://github.com/fengyi123/operationManage/blob/master/src/images/home.png)

## 前端相关技术：gulp,jQuery,rollUp,ES6,yarn:
	
	1：rollUp相关技术可参考网址      https://github.com/rollup/rollup  http://rollupjs.org/guide/
	2: yarn 依赖nodejs，需要先安装nodejs环境，安装nodejs 后执行命令 npm install -g yarn 安装yarn
	3：检查安装成功 =>
		npm -v
		yarn -V
	3：yarn add 插件名  添加开发插件
	4：yarb remove 插件名 移除插件
	

## 项目介绍：
  
	1：config目录：
        【entry.js】 配置每个html页面需要引入的js入口文件，gulp自动化编译工具会根据该配置文件打包输出单独的压缩文件。
        【gulpfile.babel.js】 gulp自动化编译配置入口文件，执行less编译，es6模块打包，文件合并，文件压缩等自动化任务。
	
	2：dist目录
	    文件打包压缩的最终目录，包括js脚本文件，css 样式文件,

	3：node_module  ....

	4: src目录
		项目开发源代码目录，包括js脚本文件，css样式文件，images图片文件等。
		src目录下的libs 文件进行不打包操作，


## 项目运行：
    
	1：该文件跟目录下控制台命令执行 yarn ，安装node_modules所有依赖的包文件	 
	2：npm run build 生产环境
	3：npm run watch 开发环境








