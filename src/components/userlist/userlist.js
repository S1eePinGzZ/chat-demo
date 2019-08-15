import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd';
import {connect} from 'react-redux';
import userimg from '../../img/user.jpg';
import socket from '../global/socketconfig'
const { SubMenu } = Menu;
const { Sider } = Layout;

class userList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist : []
    };
  }

  componentDidMount(){
    let data = this.props.data.data;
    socket.emit('login',data);
    socket.on('recv',(data) =>{
      this.props.getOnline(data)
    })
  	}

  render() {
    const yourid = this.props.data.data.id;
    const onlineList = this.props.data.online_user;
    return (
      <div className="list-container">
        <Sider width={"100%"} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  在线用户
                </span>
              }
            >
              {
                  onlineList.map((item,index) => {
                    if(item.id !== yourid){
                      return(
                        <Menu.Item key={index+1} className="user-list" style={{height: "auto"}}>
                          <div onClick={()=> {this.props.sendto(item.id);this.props.changesocket(item.id)}}>
                            <img className="user-img-left" src={ userimg } alt='' />
                            <span>{item.id}</span>
                          </div>
                        </Menu.Item>
                      )
                    }
                  })
                }

            </SubMenu>
          </Menu>
        </Sider>
        </div>
    )
  }
}

export default connect((state) => {
    return {
        data:{
          online_user : state.userlist.online_user,
          data:state.userlogin,
          sendto : state.sendmsg.sendto
        }
      }
    },
    (dispatch,props) => {
      return {
        getOnline (data){
          dispatch({
              type:'getOnline',
              data:data
          });
        },
        changesocket (data){
          dispatch({
              type:'ChangeSocket',
              data:data
          });
        },
        sendto (data){
          dispatch({
              type:'sendTo',
              data:data
          });
        },
        changechat(data){
          dispatch({
              type:'ChangeChat',
              data:data
            });
        }
        }
      })(userList);
