import React, { memo } from "react";
import moment from "moment";
import { Comment, Avatar, Icon, Tooltip } from "antd";

const CommentCard = memo(props => (
  <Comment
    datetime={
      <Tooltip
        title={moment(props.dateCreated)
          .subtract(1, "days")
          .format("YYYY-MM-DD HH:mm:ss")}>
        <span>
          {moment()
            .subtract(1, "days")
            .fromNow()}
        </span>
      </Tooltip>
    }
    author={props.userId && props.userId.username}
    avatar={<Avatar icon={<Icon type='user' />} alt={props.userId && props.userId.username} />}
    content={props.allText}
  />
));

export default CommentCard;
