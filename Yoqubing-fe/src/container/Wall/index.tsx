import React from "react";
import styles from "./index.module.less";
import { RouteComponentProps } from "react-router";

import Frame from "../../component/Frame";
import store from "../../store";
import { getInfoList, InfoList, publishInfo } from "../../service/InfoAPI";
import { getInfoListAction, publishInfoAction } from "../../action/InfoAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import unixToDate from "../../utiliy/date";
import { Icon, Spin, Input, Button, message } from "antd";

class Wall extends React.Component<{getInfoListAction: Function, publishInfoAction: Function} & RouteComponentProps, {infos: InfoList[], id: number, editing: boolean, info: {title: string, content: string}}> {
  constructor(props: any) {
    super(props);
    store.subscribe(() => {
      this.setState({...this.state, infos: store.getState().InfoReducer.infos});
    });
    this.refresh();
  }
  refresh = () => {
    getInfoList().then((res: any) => {
      if (res.code === 0) {
        this.props.getInfoListAction({infos: res.data.infos});
      }
    });
  }
  handleClick = (id: number) => {
    this.setState({...this.state, id: id});
  }
  handleEdit = () => {
    this.setState({...this.state, editing: true});
  }
  handleChange = (e : any) => {
    this.setState({...this.state, info: {...this.state.info, [e.target.name]: e.target.value}});
  }
  handleSubmit = () => {
    publishInfo(this.state.info).then((res: any) => {
      if (res.code === 0) {
        message.success("发布成功！");
        this.refresh();
      }
    });
  }
  render() {
    const inputStyle = {
      width: "75%",
      marginTop: ".5em"
    };
    let component;
    if (!this.state) component = <div className={styles.whole}><Spin size="large" /></div>;
    else component = (
      <div className={styles.whole}>
        <div className={`${styles.defaultBox} ${styles.infoBox} ${styles.editBox} ${this.state.editing ? styles.viewing : ""}`} onClick={this.handleEdit}>
          <Icon type="edit" style={{fontSize: "3em"}} />
          <div style={{textAlign: "center", fontSize: "1em"}}>发布信息</div>
          {this.state.editing ? 
            <div className={styles.edit} style={{marginTop: "1em", display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
              <Input name="title" prefix={<Icon type="bulb"/>} placeholder="标题" style={inputStyle} onChange={this.handleChange}/>
              <Input name="content" prefix={<Icon type="book"/>} type="text" placeholder="内容" style={inputStyle} onChange={this.handleChange}/>
              <Button type="primary" htmlType="submit" style={inputStyle} onClick={this.handleSubmit}>发布</Button>
            </div>
          : ""}
        </div>
        {this.state.infos ? this.state.infos.map((item: InfoList, index: number) => {
          return (
            <div className={`${styles.defaultBox} ${styles.infoBox} ${this.state.id === index ? styles.viewing : ""}`} key={index} onClick={this.handleClick.bind(this, index)}>
              {/* {this.state.id === index ? <Icon type="left-circle" className={styles.close} style={{fontSize: "3em", marginBottom: ".5em", cursor: "pointer"}} onClick={this.handleClick.bind(this, -1)} /> : ""} */}
              <div className={styles.title}>{item.title}</div>
              <div className={styles.time}>{unixToDate(item.createtime)}</div>
              <div className={styles.content}>{item.content.length > 20 && this.state.id !== index ? item.content.substr(0, 20) + ".." : item.content}</div>
              {this.state.id === index ? <div className={styles.name}>发布人：{item.name}</div> : ""}
            </div>
          );
        }) : ""}
      </div>
    );
    return (<Frame WrappedComponent={component} />);
  }
}

const mapStateToProps = (state : any) => {
  return {};
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    getInfoListAction: bindActionCreators(getInfoListAction, dispatch),
    publishInfoAction: bindActionCreators(publishInfoAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wall);