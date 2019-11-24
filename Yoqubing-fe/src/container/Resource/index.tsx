import React from "react";
import styles from "./index.module.less";
import { RouteComponentProps } from "react-router";

import Frame from "../../component/Frame";
import store from "../../store";
import { getResourceList, upload, ResourceList } from "../../service/ResourceAPI";
import { getResourceListAction, uploadResourceAction } from "../../action/ResourceAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import unixToDate from "../../utiliy/date";
import { Icon, Spin, Input, Button, message } from "antd";

class Resource extends React.Component<{getResourceListAction: Function, uploadResourceAction: Function} & RouteComponentProps, {resources: ResourceList[], id: number, editing: boolean, resource: {title : string, type: string, url: string, content : string}}> {
  constructor(props: any) {
    super(props);
    store.subscribe(() => {
      this.setState({...this.state, resources: store.getState().ResourceReducer.resources});
    });
    this.refresh();
  }
  refresh = () => {
    getResourceList().then((res: any) => {
      if (res.code === 0) {
        this.props.getResourceListAction({resources: res.data.resources});
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
    this.setState({...this.state, resource: {...this.state.resource, [e.target.name]: e.target.value}});
  }
  handleSubmit = () => {
    upload(this.state.resource).then((res: any) => {
      if (res.code === 0) {
        message.success("分享成功！");
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
        <div className={`${styles.defaultBox} ${styles.resourceBox} ${styles.editBox} ${this.state.editing ? styles.viewing : ""}`} onClick={this.handleEdit}>
          <Icon type="edit" style={{fontSize: "3em"}} />
          <div style={{textAlign: "center", fontSize: "1em"}}>分享资源</div>
          {this.state.editing ? 
            <div className={styles.edit} style={{marginTop: "1em", display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
              <Input name="name" prefix={<Icon type="bulb"/>} placeholder="资源名称" style={inputStyle} onChange={this.handleChange}/>
              <Input name="type" prefix={<Icon type="folder"/>} type="text" placeholder="资源类型" style={inputStyle} onChange={this.handleChange}/>
              <Input name="url" prefix={<Icon type="link"/>} type="text" placeholder="资源URL" style={inputStyle} onChange={this.handleChange}/>
              <Input name="content" prefix={<Icon type="book"/>} type="text" placeholder="资源类型" style={inputStyle} onChange={this.handleChange}/>
              <Button type="primary" htmlType="submit" style={inputStyle} onClick={this.handleSubmit}>发布</Button>
            </div>
          : ""}
        </div>
        {this.state.resources ? this.state.resources.map((item: ResourceList, index: number) => {
          return (
            <div className={`${styles.defaultBox} ${styles.resourceBox} ${this.state.id === index ? styles.viewing : ""}`} key={index} onClick={this.handleClick.bind(this, index)}>
              <div className={styles.title}>{item.name}</div>
              <div className={styles.time}>{unixToDate(item.updatetime)}</div>
              <div className={styles.content}>{item.content.length > 20 && this.state.id !== index ? item.content.substr(0, 20) + ".." : item.content}</div>
              {this.state.id === index ? <div className={styles.name}>分享人：{item.uname}</div> : ""}
              {this.state.id === index ? <div className={styles.url}>URL：<a href={item.url}>{item.url}</a></div> : ""}
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
    getResourceListAction: bindActionCreators(getResourceListAction, dispatch),
    uploadResourceAction: bindActionCreators(uploadResourceAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Resource);