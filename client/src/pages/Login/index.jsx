import React from "react";
import { Form, Icon, Input, Button } from "antd";
import Link from "umi/link";
import styles from "./index.less";
import { login } from "../../services/user";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then(res => {
          window.localStorage.setItem("token", res.data.token);
          window.location.href = "/";
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "please input your username" }]
          })(<Input name='username' prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />} placeholder='username' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "please input your password" }]
          })(
            <Input
              name='password'
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              placeholder='password'
            />
          )}
        </Form.Item>
        <div style={{ overflow: "hidden" }}>
          <Link to='/user/signup' className={styles.SignUp}>
            sign up
          </Link>
        </div>
        <Form.Item>
          <Button type='primary' htmlType='submit' className={styles.loginFormButton}>
            login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;
