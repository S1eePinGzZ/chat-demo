import React, { Component } from 'react';
import { Layout, Menu} from 'antd';
import {connect} from 'react-redux';
import userimg from '../../img/user.jpg';
import axios from 'axios'
const { Header} = Layout;

class HeaderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'unknow',
      pwd:''
    };
  }



  render() {
    const username = this.props.data.id;
    return (
      <Header className="header">
      <div className="header-box">
        <img className="header-user-img" src={ userimg } alt='' />
        <span>{username}</span>
      </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
        </Menu>
      </Header>
    )
  }
}


export default connect((state) => {
    return {
        data:state.userlogin
    }},
  (dispatch,props) => {
    return {
      setUser(data){
      axios.post('/user/register',data)
        .then( res => {
              dispatch({
                  type:'login',
                  data:data
              });
        } )}
    }
})(HeaderBox);
