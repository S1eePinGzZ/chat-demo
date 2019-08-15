import React, { Component } from 'react';
import { Card,Icon,Dropdown,Input,Button } from 'antd';
import './input-box.css';
import {connect} from 'react-redux';
import socket from '../global/socketconfig'

const { TextArea } = Input;
const emoji = '😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 💛'.split(' ');


class Input_Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InputMessage: '',
      MsgList :[]
    };
  }

  ChangeText = (e) =>{
    this.setState({
      InputMessage:e.target.value,
    })
  }


  InsertEmoji = (value) =>{
    this.setState({
      InputMessage: this.state.InputMessage + value,
    })
  }

  componentDidMount(){
    socket.on('recvMsg',(data) =>{
      let temp = this.props.msglist;
      temp.push(data);
      this.props.changechat(temp)
  	})}


  ChangeChatList = (to,msg,from) =>{
    let chatmsg = {
      to: to,
      msg: msg,
      from: from
    }
    let temp = this.props.msglist;
    temp.push(chatmsg);
    this.props.changechat(temp)
  }

  render() {
    const menu = (
      <div className="emoji-btn" style={{ background: '#ECECEC', padding: '3px' }}>
        <Card title="添加表情" bordered={false} style={{ width: 300 }}>
        {
          emoji.map((item,index) => {
                        return(
                          <li key={index} onClick={() => this.InsertEmoji(item)}>{item}</li>
                        )
                      })
                    }
          </Card>
      </div>
    );
    return (
      <div style={{marginTop: "10px"}}>
        <div>
          <Dropdown overlay={menu} placement="topLeft">
            <Icon className="emoji-icon" type="smile" theme="outlined" />
            </Dropdown>
        </div>
        <TextArea style={{width: "calc(100% - 50px)"}} rows={5} value={this.state.InputMessage} onChange={this.ChangeText}/>
        <Button className="send-btn" icon="arrow-right" shape="circle" size="large" type="primary" onClick={() =>{this.props.changeState(this.props.sendto,this.state.InputMessage,this.props.from);this.ChangeChatList(this.props.sendto,this.state.InputMessage,this.props.from)}}></Button>
      </div>
    )
  }
}

export default connect((state) => {
    return {
        data:state.sendmsg.msg,
        sendto:state.sendmsg.sendto,
        from: state.userlogin.id,
        msglist : state.chatlist.MsgList
    }},
  (dispatch,props) => {
    return {
        changeState(to,data,from){
                dispatch({
                    type:'sendMsg',
                    data:data
                  },socket.emit('sendMsg',to,data,from));
        },
        changechat(data){
          dispatch({
              type:'ChangeChat',
              data:data
            });
        }
    }
})(Input_Box);
