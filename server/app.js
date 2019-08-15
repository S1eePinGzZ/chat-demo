const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const cors = require('cors');
const model = require('./model');
const cookie = require('cookie');
const UserRouter = require('./user');
var inline = new Array();
var arrAllSocket = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/user',UserRouter);//开启中间件
io.on('connection',function(socket){
	function unique(arr) {
		const res = new Map();
		return arr.filter((a) => !res.has(a.userid) && res.set(a.userid, 1))
	}
//	inline.push(cookies);
//	inline = unique(inline);
	console.log("在线的人：");
//	console.log(io.sockets.connected[socket.id]);
//	console.log(inline);
	console.log(inline);
	socket.on("disconnect",() =>{
    	let cookies = cookie.parse(socket.handshake.headers.cookie);
			console.log("下线的人：");
			console.log(cookies);
			function removeAaary(_arr, _obj) {
    	var length = _arr.length;
    	for (var i = 0; i < length; i++) {
        if (_arr[i].sk == _obj) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}
			removeAaary(inline,cookies.io);
	    io.emit('recv',inline);
});

	socket.on("login",function(data){
		let cookies = cookie.parse(socket.handshake.headers.cookie);
		let temp = {
			sk: cookies.io,
			id: data.id,
			sc: socket.id
		}
		arrAllSocket[data.id] = io;
		inline.push(temp);
		unique(inline);
		console.log('socket的id');
		console.log(socket.id);
    io.emit('recv',inline);
	}
	)
	socket.on("sendMsg",function(to,data,from){
		console.log(to);
		var index=0;
		for(let i=0;i<inline.length;i++){
			if(inline[i].id == to)
			{
				index = inline[i].sc;
				console.log(inline[i]);
			}
		}
		console.log(".................");
		console.log(index);
		let store = {
			from: from,
			msg: data,
			to: to
		}
		console.log(store);
		io.to(index).emit("recvMsg",store)
	})
})




app.post('/foo',function(req,res){
		console.log(req.body);
		res.cookie('userid',req.body.id)
		console.log("here is" + inline);
		return res.json({code:0})
	})

app.post('/test',function(req,res){
		console.log(req.body);
		const userid= req.cookies.userid;
		console.log(userid);
		return res.json({code:0})
	})


server.listen(8080,function(){
	console.log("port 8080");
})
