import React, { Component } from 'react';
import { Layout,  Row, Col} from 'antd';
import ChatLeftbox from './chatbox/chat-letfbox';
import UserList from './userlist/userlist'
import ChatRightbox from './chatbox/chat-rightbox';
import InputBox from './chatbox/input-box';
import { Scrollbars } from 'react-custom-scrollbars';
import HeaderBox from './header/headerbox'
import {connect} from 'react-redux';

const {Content} = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msglist: this.props.data.msglist,
      sendto: this.props.data.sendto
    };
  }

  filterchatlist =(chatlist,userid)=>{
    let data = [];
    chatlist.map((item,index) =>{
      if((item.to === userid) || (item.from === userid))
      {
        data.push(item)
      }
    })
    return data;
  }

  render() {
    let chatlist = this.props.data.msglist;
    let userid = this.props.data.usermsg;
    chatlist = this.filterchatlist(chatlist,userid)
    let user = this.props.data.userid;
    return (
      <Layout>
        <HeaderBox></HeaderBox>
        <Layout className="outer-container">
          <UserList></UserList>
            <Layout style={{ padding: '0 10px 24px' }}>
              <Row>
              <Col lg={{span: 14,offset: 5}} xs={{span: 24,offset: 0}}>
                <div className="chat-title">
                  <span>{this.props.sendto}</span>
                </div>
                <Content
                className="chat-container"
                  style={{
                    background: '#fff',
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                <Scrollbars className="chat-message">
                    <div>
                      {
                        chatlist.map((item,index) =>{
                          if(item.from === user)
                          {
                            return(
                                <ChatRightbox key={index} chatmsg={item} user={user}></ChatRightbox>
                            )
                          }
                          else{
                            return (
                              <ChatLeftbox key={index} chatmsg={item}></ChatLeftbox>
                            )
                          }
                        })
                      }
                    </div>
                </Scrollbars >
                </Content>
                <div className="input-text">
                  <InputBox></InputBox>
                </div>
              </Col>
              </Row>
            </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default connect((state) => {
    return {
      data: {
        sendto : state.sendmsg.sendto,
        usermsg : state.userlogin.nowsok,
        userid: state.userlogin.id,
        msglist : state.chatlist.MsgList
      }
    }}
)(Index);
