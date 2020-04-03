import React from "react";
import { Form, Button, Input } from "antd";
import { getActivitiyComments, addActivitiyComment, getActivtiyById } from "../../services/activity";
import ActivityCard from "../ActivityCard";
import CommentCard from "../CommentCard";

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={2} cols={100} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class ActivityComments extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      submitting: false,
      value: "",
      activity: {}
    };
  }

  componentDidMount() {
    this.getComments();
    this.getActivity();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.activityId !== this.props.match.params.activityId) {
      this.getComments();
      this.getActivity();
    }
  }

  getActivity = () => {
    getActivtiyById(this.props.match.params.activityId).then(res => {
      this.setState({
        activity: res.data
      });
    });
  };

  getComments = () => {
    getActivitiyComments(this.props.match.params.activityId).then(res => {
      this.setState({
        list: res.data.list
      });
    });
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true
    });
    addActivitiyComment(this.state.activity._id, {
      allText: this.state.value
    })
      .then(() => {
        this.getComments();
        this.setState({
          value: ""
        });
      })
      .finally(() => {
        this.setState({
          submitting: false
        });
      });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { list, submitting, value } = this.state;
    return (
      <ActivityCard
        {...this.state.activity}
        actions={[<Editor onChange={this.handleChange} onSubmit={this.handleSubmit} submitting={submitting} value={value} />]}>
        {list.map(item => (
          <CommentCard {...item} key={item._id} />
        ))}
      </ActivityCard>
    );
  }
}

export default ActivityComments;
