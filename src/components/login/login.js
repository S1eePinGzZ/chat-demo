import React, { Component } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
} from 'antd';
import ModalBox from '../global/modalbox'

import {connect} from 'react-redux';
import axios from 'axios'



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      visible : false,
      data : {
        code: null,
        text: ''
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          id : values.id,
          pwd :values.pwd,
          islogin :true
        }
        this.props.login(data,this.showModal)
      }
    });
  };


  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


showModal = (data) =>{
  this.setState({
    visible: true,
    data: data
  })
}

closeModal = (data) =>{
  this.setState({
    visible: false,
    data : {
      code: null,
      text: ''
    }
  },() =>{
    if(data.code === 0)
    {
      this.props.changeislogin()
    }
  })
}

render() {
 const { getFieldDecorator } = this.props.form;
 const formItemLayout = {
   labelCol: {
     xs: { span: 24 },
     sm: { span: 8 },
   },
   wrapperCol: {
     xs: { span: 24 },
     sm: { span: 16 },
   },
 };
 const tailFormItemLayout = {
   wrapperCol: {
     xs: {
       span: 24,
       offset: 0,
     },
     sm: {
       span: 16,
       offset: 8,
     },
   },
 };
    return (
      <div>
      <Row>
      <Col xs={{span:22,offset:1}} md={{span:12,offset:6}} lg={{span:10,offset:7}} xl={{span:6,offset:9}} className="register-box-outer">
      <div className="register-box">
      <div className="register-title" id="test">
        <span>登录</span>
      </div>
      <Form  {...formItemLayout} onSubmit={this.handleSubmit}>
      <Form.Item
        label={
          <span>
            昵称（账号）
          </span>
        }
      >
        {getFieldDecorator('id', {
          rules: [{ required: true, message: '请输入昵称！', whitespace: true }],
        })(<Input />)}
      </Form.Item>
       <Form.Item label="密码" hasFeedback>
         {getFieldDecorator('pwd', {
           rules: [
             {
               required: true,
               message: '请输入密码！',
             },
             {
               validator: this.validateToNextPassword,
             },
           ],
         })(<Input.Password />)}
       </Form.Item>
       <Form.Item {...tailFormItemLayout}>
         <Button  type="primary" htmlType="submit">
           登录
         </Button>
         <Button onClick={this.props.changeneedregister} type="link" block style={{float:'right',marginTop:'3px',width:'auto'}}>
          注册
         </Button>
       </Form.Item>
     </Form>
     </div>
   </Col>
   </Row>
   <ModalBox closeModal={this.closeModal} visible = {this.state.visible} data = {this.state.data}></ModalBox>
  </div>
    )
  }
}
const Logins = Form.create({ name: 'login' })(Login);

export default connect((state) => {
    return {
        data:state.userlogin
    }},
  (dispatch,props) => {
    return {
      login (data,callback){
      axios.post('/user/login',data)
        .then( res => {
              dispatch({
                  type:'login',
                  data:data
              });
              callback(res.data)
        } )}
    }
})(Logins);
