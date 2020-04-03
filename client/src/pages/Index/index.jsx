import React from "react";
import { Card, Row, Col, PageHeader } from "antd";
import router from "umi/router";
import ActivityList from "../../components/ActivityList";
import ShowModal from "../../components/ShowModal";
import ActivityForm from "../../components/ActivityForm";
import { getActivityList } from "../../services/activity";
import CommentList from "../../components/CommentList";
import Calendar from "../../components/Calendar";

const MY_TAGGED_ACTIVITY_TYPE = 1;

class ActivityComments extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      taggedList: []
    };
  }

  componentDidMount() {
    this.getActivities();
    this.getTaggedActivities();
  }

  getActivities = () => {
    getActivityList().then(res => {
      this.setState({
        list: res.data.list
      });
    });
  };

  getTaggedActivities = () => {
    getActivityList({
      type: MY_TAGGED_ACTIVITY_TYPE
    }).then(res => {
      this.setState({
        taggedList: res.data.list
      });
    });
  };

  showAddActivityModal = () => {
    ShowModal({
      title: "add activity",
      children: [ActivityForm],
      props: {
        onOk: () => {
          this.getActivities();
        }
      },
      hasFooter: false
    });
  };

  OnUpdate = () => {
    this.getActivities();
    this.getTaggedActivities();
  };

  render() {
    const { list, taggedList } = this.state;
    return (
      <Row gutter={30}>
        <Col span={8}>
          <Card
            title='your activities'
            bodyStyle={{ height: "40vh", overflowY: "scroll", paddingBottom: "20px" }}
            extra={
              <a href='javasript:void(0);' onClick={this.showAddActivityModal}>
                add
              </a>
            }>
            <ActivityList list={list} onUpdate={this.getActivities} />
          </Card>

          <Card
            title='tagged activities'
            style={{ marginTop: "20px" }}
            bodyStyle={{ height: "40vh", overflowY: "scroll", paddingBottom: "20px" }}>
            <ActivityList list={taggedList} onUpdate={this.getTaggedActivities} />
          </Card>
        </Col>
        <Col span={16}>
          {this.props.route.name === "index" ? (
            <div style={{ background: "#fff", overflow: "hidden" }}>
              <Calendar className='calendar' list={[...list, ...taggedList]} OnUpdate={this.OnUpdate} />
            </div>
          ) : (
            <div style={{ background: "#fff", overflow: "hidden" }}>
              <PageHeader
                onBack={() => {
                  router.push("/");
                }}
                title='back'
              />
              <Card>
                <CommentList {...this.props} />
              </Card>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

export default ActivityComments;
