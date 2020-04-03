import React from "react";
import { Form, Icon, Input, Button } from "antd";
import Link from "umi/link";

import styles from "./index.less";
import { signup } from "../../services/user";

const pwdPattern = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        signup(values).then(res => {
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
            rules: [
              {
                required: true,
                message: "8-16 characters, including at least two combinations of numbers / letters / characters",
                pattern: new RegExp(pwdPattern)
              }
            ]
          })(
            <Input
              name='password'
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              placeholder='password'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("confirm", {
            rules: [{ required: true, message: "please input your password" }]
          })(
            <Input
              name='confirm'
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              placeholder='confirm password'
            />
          )}
        </Form.Item>
        <div style={{ overflow: "hidden" }}>
          <Link to='/user/login' className={styles.SignUp}>
            login
          </Link>
        </div>
        <Form.Item>
          <Button type='primary' htmlType='submit' className={styles.loginFormButton}>
            sign up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;
