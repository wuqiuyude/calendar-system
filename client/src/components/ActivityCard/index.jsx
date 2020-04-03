import React, { memo } from "react";
import { Comment, Avatar, Icon } from "antd";

const ActivityCard = memo(props => (
  <Comment
    actions={props.actions}
    // actions={[
    //   <span key='comment-nested-reply-to'>
    //     <Icon type='message' style={{ marginRight: "5px" }} /> 2
    //   </span>
    // ]}
    author={props.userId && props.userId.username}
    avatar={<Avatar icon={<Icon type='user' />} alt={props.userId && props.userId.username} />}
    content={
      <div>
        <h5>{props.title}</h5>
        <p>{props.description}</p>
      </div>
    }>
    {props.children}
  </Comment>
));

export default ActivityCard;
