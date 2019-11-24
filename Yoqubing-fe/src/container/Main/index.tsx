import React from "react";
import styles from "./index.module.less";
import { RouteComponentProps } from "react-router";

import Frame from "../../component/Frame";
import { Avatar } from "antd";

class Main extends React.Component<RouteComponentProps, any> {
  render() {
    return (
      <Frame WrappedComponent={
        <div className={styles.whole}>
          <Avatar src="http://chper.cn/2.png" style={{width: "15em", height: "15em"}} />
          <div className={styles.titlezh}>有 求 必 应</div>
          <div className={styles.titleen}>Y o q u b i n g</div>
          <div className={styles.info}>专为大学生打造的校园供求平台</div>
        </div>
      } Boxed={true} />
    );
  }
}

export default Main;