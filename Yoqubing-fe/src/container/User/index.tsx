import React from "react";
import styles from "./index.module.less";
import { RouteComponentProps } from "react-router";

import Frame from "../../component/Frame";
import { me } from "../../service/UserAPI";
import { bindActionCreators } from "redux";
import { meAction, logoutAction } from "../../action/UserAction";
import { connect } from "react-redux";
import store from "../../store";
import { Spin, Avatar } from "antd";

class User extends React.Component<{meAction: Function, logoutAction: Function} & RouteComponentProps, any> {
  unsubscribe = store.subscribe(() => {
    this.setState(store.getState().UserReducer.information);
  });
  componentWillMount() {
    this.handleRefresh();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleRefresh = () => {
    me().then((res: any) => {
      if (res.code === 0) {
        this.props.meAction(res.data);
      }
    });
  }
  handleLogout = () => {
    this.props.logoutAction();
  }
  render() {
    if (!window.localStorage.session) this.props.history.push("/user/login");
    let component;
    if (!this.state) {
      component = (
        <div className={styles.whole}>
          <Spin size="large"/>
        </div>
      );
    }
    else {
      const userItem = (item: string, value: string) => {
        return (
          <div className={styles.items} key={item}>
            <div>{item}</div>
            <div>{value}</div>
          </div>
        );
      }
      component = (
        <div className={styles.whole}>
          <div className={styles.info}>
            <Avatar size="large" src="http://chper.cn/1.jpg" style={{width: "10em", height: "10em", marginBottom: "2em"}}/>
            {userItem("姓名", this.state.name)}
            {userItem("手机号", this.state.phone)}
            {userItem("年级", this.state.grade)}
            {userItem("专业", this.state.major)}
            {userItem("信誉分", this.state.score)}
            {userItem("余额", this.state.balance)}
            <div className={`${styles.items} ${styles.button}`} onClick={this.handleLogout}>
              <div>登 出</div>
            </div>
          </div>
        </div>
      );
    }
    return <Frame WrappedComponent={component} Boxed={true} />;
  }
}

const mapStateToProps = (state : any) => {
  return {};
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    meAction: bindActionCreators(meAction, dispatch),
    logoutAction: bindActionCreators(logoutAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);