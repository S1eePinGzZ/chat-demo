## 简介

使用React + mongoDB + react-redux + express + websecket 搭建的小型聊天室

实现登录，注册，显示在线用户，1v1聊天，以及不同终端的适配

## 运行

在根目录运行 npm isntall 安装依赖环境

npm start 运行项目

在http://localhost:3000   查看效果

后台运行端口为8080，如果端口占用在server/app.js中更改端口，并在package.json，中更改proxy代理

```
  "proxy": "http://localhost:8080"
```

## 目录

```
    public/
    server/    //后端文件
          app.js    //后端主文件
          model.js  //链接、创建mongodb
          user.js   //用户登录、注册API   
    src/
          components/    //组件
                    chatbox/   //聊天框组件
                    global/    //全局组件
                    header/    //header组件
                    login/     //登录和注册组件
                    userlist/  //用户栏组件              
          img/   //图片      
          redux/   //redux文件
                chatlist.redux.js   //保存从websocket接收到的消息列表
                sendmsg.redux.js    //保存用户发送框的信息
                userinfo.redux.js   //保存用户登录状态和信息
                userlist.redux.js   //保存从后端获取的在线用户列表
          reducer.js   //合并所有的reducer
          
    package.json
```
