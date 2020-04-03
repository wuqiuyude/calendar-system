import React, { Component } from "react";
import moment from "moment";
import { Form, Button, Input, Row, Col, DatePicker } from "antd";
import ShowModal from "../ShowModal";
import { createActivity, updateActivity } from "../../services/activity";
import UploadImg from "../UploadImg";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

class AddActivityForm extends Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values,
          from: values.rangTime[0].format("YYYY-MM-DD HH:mm:ss"),
          to: values.rangTime[1].format("YYYY-MM-DD HH:mm:ss")
        };
        delete data.rangTime;
        if (this.props._id) {
          updateActivity(this.props._id, data).then(() => {
            this.props.onOk();
            this.onClose();
          });
        } else {
          createActivity(data).then(() => {
            this.props.onOk();
            this.onClose();
          });
        }
      }
    });
  };

  onClose = () => {
    ShowModal.close();
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className='custom-form' {...formItemLayout}>
          <Form.Item label='title'>
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input style={{ width: "200px" }} placeholder='please input title' />)}
          </Form.Item>
          <Form.Item label='description'>
            {getFieldDecorator("description")(
              <Input.TextArea style={{ width: "200px" }} rows={5} placeholder='please input description' />
            )}
          </Form.Item>
          <Form.Item label='location'>
            {getFieldDecorator("location")(<Input style={{ width: "200px" }} placeholder='please input location' />)}
          </Form.Item>
          <Form.Item label='time'>
            {getFieldDecorator("rangTime", {
              rules: [
                {
                  required: true
                }
              ]
            })(<DatePicker.RangePicker format='YYYY-MM-DD HH:mm' showTime style={{ width: "300px" }} />)}
          </Form.Item>
          <Form.Item label='url'>{getFieldDecorator("url")(<UploadImg />)}</Form.Item>
        </Form>
        <Row type='flex' justify='end'>
          <Col span={4}>
            <Button onClick={this.onClose}>cancel</Button>
          </Col>
          <Col span={4}>
            <Button type='primary' onClick={this.handleSubmit}>
              {this.props._id ? "save" : "add"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
const WapperAddActivityForm = Form.create({
  name: "AddActivityForm",
  mapPropsToFields(props) {
    console.log(props);
    return {
      title: Form.createFormField({
        value: props.title || ""
      }),
      description: Form.createFormField({
        value: props.description || ""
      }),
      url: Form.createFormField({
        value: props.url || ""
      }),
      location: Form.createFormField({
        value: props.location || ""
      }),
      rangTime: Form.createFormField({
        value: [moment(props.startTime || new Date()), moment(props.endTime || new Date())]
      })
    };
  }
})(AddActivityForm);
export default WapperAddActivityForm;
