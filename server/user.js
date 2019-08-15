const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}

Router.use((req, res, next) => {
  next()
})


Router.post('/register',function(req,res){
  console.log("注册的用户信息：" + req.body);
  User.findOne({user:req.body.id},function(err,doc){
    if(doc){
			return res.json({code:1,msg:'用户名重复，请重新选择用户名'})
		}
    const userModel = new User({user:req.body.id ,pwd: req.body.pwd})
     userModel.save(function(err,doc){
   			if(err){
   				return res.json({code:2,msg:'后端出错，请重新尝试或联系管理员'})
   			}
          res.cookie('userid',req.body.id)
   				return res.json({code:0,msg:'注册成功，自动登录'})
   			}
   		)
  })
})


Router.post('/login',function(req,res){
  console.log("登录的用户信息：" + req.body);
  User.findOne({user:req.body.id,pwd:req.body.pwd},function(err,doc){
    if(err){
			return res.json({code:2,msg:'服务器出错，请重新尝试或联系管理员'})
		}else{
			if(doc == null){
				return res.json({code:1,msg:'用户不存在或者密码错误，请重新尝试'})
			}
			res.cookie('userid',req.body.id)
			return res.json({code:0,data:doc,msg:'登录成功，开始愉快的聊天吧'})
		}
  })
})



module.exports = Router ;
