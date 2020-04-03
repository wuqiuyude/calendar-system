// import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import Link from "umi/link";
import React from "react";
import styles from "./UserLayout.less";

const UserLayout = props => {
  const { children } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to='/'>
                <span className={styles.title}>calendar sysytem</span>
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default UserLayout;
