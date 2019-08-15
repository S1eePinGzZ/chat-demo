import React, { Component } from 'react';
import userimg from '../../img/user.jpg';
import './right.css';

class Chat_Rightbox extends Component {
  render() {
    return (
      <div className="chat-right-box">
          <img className="user-img-right" src={ userimg } alt='' />
          <div className="chat-po-right">
            <span className="chat-userid-you">{this.props.user}</span>
            <div className="chat-text-right">
              <p>{this.props.chatmsg.msg}</p>
            </div>
          </div>
      </div>
    )
  }
}

export default Chat_Rightbox;
