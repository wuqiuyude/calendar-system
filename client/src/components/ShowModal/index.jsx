import React, { Component } from "react";
import { is, fromJS } from "immutable";
import ReactDOM from "react-dom";
import { Modal } from "antd";

const defaultState = {
  title: "",
  childs: "",
  width: 520,
  cancelText: "cancel",
  okText: "ok",
  visible: false,
  onOk: () => {},
  onCancel: () => {},
  hasFooter: true
};
class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  // open modal
  open = options => {
    const childs = this.renderChildren(options.props || {}, options.children) || "";
    this.setState({
      ...defaultState,
      ...options,
      visible: true,
      childs
    });
  };

  close = () => {
    this.setState({
      visible: false
    });
  };

  onOk = () => {
    this.state.onOk();
    this.close();
  };

  update = options => {
    const childs = this.renderChildren(options.props || {}, options.children) || "";
    this.setState({
      ...options,
      childs
    });
  };

  onCancel = () => {
    this.state.onCancel();
    this.close();
  };

  renderChildren(props, children) {
    const childs = [];
    const ps = {
      ...props, // bind props to children
      _close: this.close // close event to children
    };
    children.forEach((currentItem, index) => {
      childs.push(
        React.createElement(currentItem, {
          ...ps,
          key: index
        })
      );
    });
    return childs;
  }

  render() {
    return this.state.hasFooter ? (
      <Modal {...this.state} onOk={this.onOk} onCancel={this.onCancel}>
        {this.state.childs}
      </Modal>
    ) : (
      <Modal {...this.state} onOk={this.onOk} onCancel={this.onCancel} footer={null}>
        {this.state.childs}
      </Modal>
    );
  }
}

const div = document.createElement("div");
document.body.appendChild(div);
const Box = React.createRef();
ReactDOM.render(<Dialog ref={Box} />, div);

const ShowModal = props => {
  Box.current.open(props);
};

ShowModal.close = () => {
  Box.current.close();
};
ShowModal.update = props => {
  Box.current.update(props);
};
export default ShowModal;
