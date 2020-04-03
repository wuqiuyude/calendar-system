import React, { memo, useEffect, useState } from "react";
import { Row, Avatar, Icon, Col, Input, Button, Empty } from "antd";
import { addActivtiyTaggedUsers, getActivtiyTaggedUsers } from "../../services/activity";

const TaggedUserList = memo(props => {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState([]);

  const getUsers = () => {
    getActivtiyTaggedUsers(props._id).then(res => {
      setList(res.data.list);
    });
  };

  const addNewUser = () => {
    addActivtiyTaggedUsers(props._id, { taggedUsername: username }).then(() => {
      getUsers();
      setUsername("");
    });
  };

  useEffect(() => {
    getUsers();
  }, [props._id]);

  return (
    <Row gutter={10}>
      {list.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        list.map(item => (
          <Col span={4}>
            <Avatar icon={<Icon type='user' />} />
            <p>{item.taggedUserId && item.taggedUserId.username}</p>
          </Col>
        ))
      )}
      {props.type === 0 && (
        <Col span={24}>
          tagged username:{" "}
          <Input
            placeholder='please input username'
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
            style={{ width: "200px", marginRight: "10px" }}
          />
          <Button onClick={addNewUser}>tag user</Button>
        </Col>
      )}
    </Row>
  );
});

export default TaggedUserList;
