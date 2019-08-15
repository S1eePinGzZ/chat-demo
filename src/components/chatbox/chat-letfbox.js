import React, { Component } from 'react';
import userimg from '../../img/user.jpg';

class Chat_leftbox extends Component {
  render() {
    return (
      <div className="chat-left-box">
          <img className="user-img-left" src={ userimg } alt='' />
          <div className="chat-po-left">
            <span className="chat-userid-other">{this.props.chatmsg.from}</span>
            <div className="chat-text-left">
              <p>{this.props.chatmsg.msg}</p>
            </div>
          </div>
      </div>
    )
  }
}

export default Chat_leftbox;
