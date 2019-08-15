const mongoose = require('mongoose');
//链接mongo 并且使用react 这个集合
const DB_URL = 'mongodb://localhost/here';
mongoose.connect(DB_URL,{ useNewUrlParser: true })

mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

mongoose.connection.on("open", function () {
    console.log("数据库连接成功");
})

mongoose.connection.on('disconnected', function () {
    console.log('数据库连接断开');
})

const models = {
	user:{
		'user':{'type':String,'require':true},
		'pwd':{'type':String,'require':true},
	}
}


//批量生成
for(let m in models){
	mongoose.model(m,new mongoose.Schema(models[m]));
  console.log("what?");
}


module.exports  = {
	getModel:function(name){
		return mongoose.model(name)
	}
}
