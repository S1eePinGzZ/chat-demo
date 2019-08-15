import React, { Component } from 'react';
import { Modal} from 'antd';

class ModalBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      data : this.props.data
    };
  }

  handleOk = e => {
    this.props.closeModal(this.props.data)
  };

  handleCancel = e => {
    this.props.closeModal(this.props.data)
  };



  render() {
    return (
      <Modal
          title="提示"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.props.data.msg}</p>

        </Modal>
    )
  }
}

export default ModalBox;
