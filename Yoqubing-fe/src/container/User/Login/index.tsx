import React from "react";
import styles from "./index.module.less";
import { Row, Col, Input, Icon, Button, message } from "antd";
import { login, register } from "../../../service/UserAPI";
import { loginAction, registerAction } from "../../../action/UserAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import Frame from "../../../component/Frame";

class Login extends React.Component<{loginAction: Function, registerAction: Function} & RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {login: {}, register: {}};
  }
  handleLoginChange = (e : any) => {
    let state = this.state;
    state.login[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleRegisterChange = (e : any) => {
    let state = this.state;
    state.register[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleLogin = () => {
    const hide = message.loading("正在登录...", 0);
    login(this.state.login).then((res : any) => {
      hide();
      if (res.code === 0) {
        this.props.loginAction({id: res.data.id, name: res.data.name, token: res.data.token});
        message.success("欢迎回来，" + res.data.name + "！");
        this.props.history.push("/user");
      }
      else {
        message.error("用户名或密码错误！");
      }
    });
  }
  handleRegister = () => {
    const hide = message.loading("正在注册...", 0);
    register(this.state.register).then((res : any) => {
      hide();
      if (res.code === 0) {
        this.props.registerAction();
        message.success("注册成功！");
        let state = this.state;
        state.login.username = state.register.username;
        state.login.password = state.register.password;
        this.setState(state);
        this.handleLogin();
      }
      else {
        message.error("用户名已存在！");
      }
    });
  }
  render() {
    const inputStyle = {marginTop: "1em", width: "100%"};
    const component = (
      <Row className={styles.whole}>
        <Col span={9}>
          <div className={styles.login}>登录</div>
          <Input name="username" prefix={<Icon type="user"/>} placeholder="用户名" style={inputStyle} onChange={this.handleLoginChange}/>
          <Input name="password" prefix={<Icon type="lock"/>} type="password" placeholder="密码" style={inputStyle} onChange={this.handleLoginChange}/>
          <Button type="primary" htmlType="submit" style={inputStyle} onClick={this.handleLogin}>登录</Button>
        </Col>
        <Col span={7} offset={3}>
          <div className={styles.register}>注册</div>
          <Input name="username" prefix={<Icon type="user"/>} placeholder="用户名" style={inputStyle} onChange={this.handleRegisterChange}/>
          <Input name="password" prefix={<Icon type="lock"/>} type="password" placeholder="密码" style={inputStyle} onChange={this.handleRegisterChange}/>
          <Input name="repeat" prefix={<Icon type="lock"/>} type="password" placeholder="重复密码" style={inputStyle} onChange={this.handleRegisterChange}/>
          <Input name="name" prefix={<Icon type="profile"/>} placeholder="真实姓名" style={inputStyle} onChange={this.handleRegisterChange}/>
          <Input name="phone" prefix={<Icon type="phone"/>} placeholder="手机号码" style={inputStyle} onChange={this.handleRegisterChange}/>
          <Input name="grade" prefix={<Icon type="compass"/>} placeholder="年级" style={inputStyle} onChange={this.handleRegisterChange}/>
          <Input name="major" prefix={<Icon type="star"/>} placeholder="专业" style={inputStyle} onChange={this.handleRegisterChange}/>
          <Button type="primary" htmlType="submit" style={inputStyle} onClick={this.handleRegister}>注册</Button>
        </Col>
      </Row>
    );
    return <Frame WrappedComponent={component} Boxed={true} />;
  }
}

const mapStateToProps = (state : any) => {
  return {};
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
    registerAction: bindActionCreators(registerAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));