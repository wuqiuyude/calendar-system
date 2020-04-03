import React, { memo } from "react";
import { List, Icon, Tag, Row, Col } from "antd";
import Link from "umi/link";
import ActivityForm from "../ActivityForm";
import ShowModal from "../ShowModal";
import { deleteActivity, acceptActivityTag } from "../../services/activity";
import TaggedUserList from "../TaggedUserList";

const IconText = ({ type, text, onClick, style }) => (
  <span onClick={onClick} role='button' style={style}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const ActivityList = memo(({ list, onUpdate }) => {
  const showEidtActivityModal = activity => {
    ShowModal({
      title: "edit activity",
      children: [ActivityForm],
      width: 700,
      props: {
        onOk: () => {
          onUpdate();
        },
        ...activity
      },
      hasFooter: false
    });
  };

  const onDeleteActivity = _id => {
    deleteActivity(_id).then(() => {
      onUpdate();
    });
  };

  const showTaggedUser = item => {
    ShowModal({
      title: "tagged user",
      children: [TaggedUserList],
      props: {
        onOk: () => {
          onUpdate();
        },
        ...item
      },
      hasFooter: false
    });
  };

  const onAcceptTag = item => {
    console.log(item);
    acceptActivityTag(item._id, item.user._id, {
      accepted: true
    }).then(() => {
      onUpdate();
    });
  };

  const actions = item => {
    return item.type === 0
      ? [
          <IconText
            type='edit'
            key='list-vertical-star-o'
            onClick={() => {
              showEidtActivityModal(item);
            }}
          />,
          <IconText
            type='delete'
            key='list-vertical-delete-o'
            onClick={() => {
              onDeleteActivity(item._id);
            }}
          />,
          <Link to={`/activity/${item._id}/comments`}>
            <IconText type='message' key='list-vertical-message' />
          </Link>,
          <IconText type='usergroup-add' key='list-vertical-usergroup' onClick={() => showTaggedUser(item)} />
        ]
      : [
          <Link to={`/activity/${item._id}/comments`}>
            <IconText type='message' key='list-vertical-message' />
          </Link>,
          <IconText type='usergroup-add' key='list-vertical-usergroup' onClick={() => showTaggedUser(item)} />,
          item.accepted ? (
            <IconText type='tag' text='accepted' key='list-vertical-tag' style={{ color: "#87d068" }} />
          ) : (
            <IconText type='tag' text='accept tag' key='list-vertical-tag' onClick={() => onAcceptTag(item)} />
          )
        ];
  };

  return (
    <List
      dataSource={list}
      itemLayout='vertical'
      renderItem={item => (
        <List.Item key={item.title} actions={actions(item)}>
          <List.Item.Meta
            title={
              <div>
                <IconText type='user' key='list-user' text={item.user.username} />
                <span style={{ color: "rgba(0, 0, 0, 0.45)", marginLeft: "10px", fontSize: "12px" }}>
                  <IconText type='environment' text={item.location} key='list-vertical-star-o' />
                </span>
              </div>
            }
            description={item.title}
          />
          <div>
            <Row gutter={5}>
              <Col span={10}>{item.url && <img src={item.url} alt='' width='100px' style={{ margin: "5px" }} />}</Col>
              <Col span={14}>
                <p style={{ wordBreak: "break-all", wordWrap: "break-word" }}>{item.description}</p>
              </Col>
            </Row>
            {item.type === 1 && <Tag color='magenta'>tagged by {item.taggedByUserId.username}</Tag>}

            <p style={{ color: "rgba(0, 0, 0, 0.45)", marginTop: "10px", fontSize: "12px" }}>
              <IconText type='calendar' text={`${item.startTime}~${item.endTime}`} key='list-vertical-star-o' />
            </p>
          </div>
        </List.Item>
      )}
    />
  );
});

export default ActivityList;
