// import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import React from "react";
import ProLayout from "@ant-design/pro-layout";
import { Icon, Button, Row, Col, Avatar } from "antd";
import styles from "./BasicLayout.less";

const BasicLayout = props => {
  const { children } = props;
  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/user/login";
  };
  return (
    <ProLayout
      logo={null}
      menuRender={false}
      rightContentRender={() => (
        <Row type='flex' justify='end'>
          <Col>
            <Avatar icon={<Icon type='user' />} />
          </Col>
          <Col>
            <Button
              style={{
                margin: "0 20px"
              }}
              type='link'
              role='button'
              target='__blank'
              onClick={logout}>
              <Icon type='logout' />
              logout
            </Button>
          </Col>
        </Row>
      )}
      {...props}>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </ProLayout>
  );
};

export default BasicLayout;
