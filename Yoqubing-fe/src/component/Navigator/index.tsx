import React from "react";
import styles from "./index.module.less";
import NavigatorButton from "./NavigatorButton";
import { Icon } from "antd";

export default class Navigator extends React.Component<any, any> {
  render() {
    const iconStyle = {
      fontSize: "1.5em"
    };
    return (
      <div className={styles.navigator}>
        <NavigatorButton href="/" title="首页" icon={<Icon type="home" theme="filled" style={iconStyle} />} />
        <NavigatorButton href="/order" title="跑腿" icon={<Icon type="notification" theme="filled" style={iconStyle} />} />
        <NavigatorButton href="/myorder" title="我的跑腿" icon={<Icon type="bell" theme="filled" style={iconStyle} />} />
        <NavigatorButton href="/wall" title="墙墙" icon={<Icon type="message" theme="filled" style={iconStyle} />} />
        <NavigatorButton href="/resource" title="资源" icon={<Icon type="read" theme="filled" style={iconStyle} />} />
        <NavigatorButton href="/user" title="个人" icon={<Icon type="user" style={iconStyle} />} />
      </div>
    );
  }
}