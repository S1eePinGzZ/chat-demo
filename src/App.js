import React, { Component } from 'react';
import Index from './components/index'
import Register from './components/login/register'
import Login from './components/login/login'
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin : false,
      needregister: false
    };
  }

  changeislogin = () =>{
    this.setState({
      islogin: true
    })
  }

  changeneedregister = () =>{
    this.setState({
      needregister: true
    })
  }

  closeneedregister = () =>{
    this.setState({
      needregister: false
    })
  }

  render() {
    const islogin = this.state.islogin;
    const needregister = this.state.needregister;
    return (
      <div className="App">
        {
          islogin ?
          <Index store={this.props.store}></Index>
         :(
          needregister ?
          <Register closeneedregister={this.closeneedregister} changeislogin ={this.changeislogin}></Register>
          :<Login changeneedregister={this.changeneedregister} changeislogin ={this.changeislogin} ></Login>
        )
        }

      </div>
    );
  }
}

export default connect((state) => {
    return {
        data:state.userlogin
    }
})(App);
