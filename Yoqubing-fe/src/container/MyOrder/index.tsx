import React from "react";
import styles from "./index.module.less";
import { RouteComponentProps } from "react-router";

import Frame from "../../component/Frame";
import store from "../../store";
import { getOrderList, publishOrder, BriefOrder, FullOrder, getMyOrderList, acceptOrder } from "../../service/OrderAPI";
import { getOrderListAction, publishOrderAction, getMyOrderListAction } from "../../action/OrderAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import unixToDate, { secToHour } from "../../utiliy/date";
import { Icon, Spin, Input, Button, message } from "antd";

class MyOrder extends React.Component<{getOrderListAction: Function, getMyOrderListAction: Function, publishOrderAction: Function} & RouteComponentProps, {my: FullOrder[], other: BriefOrder[], id: number}> {
  constructor(props: any) {
    super(props);
    store.subscribe(() => {
      this.setState({...this.state, other: store.getState().OrderReducer.other, my: store.getState().OrderReducer.my});
    });
    this.refresh();
  }
  refresh = () => {
    getOrderList().then((res: any) => {
      if (res.code === 0) {
        this.props.getOrderListAction({orders: res.data.orders});
      }
    });
    getMyOrderList().then((res: any) => {
      if (res.code === 0) {
        this.props.getMyOrderListAction({orders: res.data.orders});
      }
    });
  }
  handleClick = (id: number) => {
    this.setState({...this.state, id: id});
  }
  handleAccept = (id: number) => {
    acceptOrder({id: id}).then((res: any) => {
      if (res.code === 0) {
        message.success("操作成功！");
      }
    });
  }
  render() {
    const inputStyle = {
      width: "100%",
      marginTop: ".5em"
    };
    let component;
    if (!this.state) component = <div className={styles.whole}><Spin size="large" /></div>;
    else component = (
      <div className={styles.whole}>
        {this.state.my ? this.state.my.map((item: FullOrder, index: number) => {
          return (
            <div className={`${styles.defaultBox} ${styles.orderBox} ${this.state.id === index ? styles.viewing : ""}`} key={index} onClick={this.handleClick.bind(this, index)}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.time}>{this.state.id === index ? "发布时间：" : ""}{unixToDate(item.createtime)}</div>
              {this.state.id === index ? <div className={styles.time}>截止时间：{unixToDate(item.deadline)}</div> : ""}
              {this.state.id === index ? <div className={styles.time}>接取时间：{unixToDate(item.accepttime)}</div> : ""}
              {this.state.id === index ? <div className={styles.time}>预计耗时：{secToHour(item.lasting)}</div> : ""}
              {this.state.id === index ? <div className={styles.time}>类型：{item.type}</div> : ""}
              <div className={styles.content}>{item.content.length > 20 && this.state.id !== index ? item.content.substr(0, 20) + ".." : item.content}</div>
              {this.state.id === index ? <div className={styles.name}>发布人：{item.name} ， 信誉分：{item.score} ， 联系方式： {item.phone}</div> : ""}
              {this.state.id === index ? <div className={styles.time}>接取人：{item.name2} ， 信誉分：{item.score2} ， 联系方式： {item.phone2}</div> : ""}
              {this.state.id === index ? <div className={styles.name}>预计花费：{item.money} 元</div> : ""}
              {this.state.id === index ? 
                <Button type="primary" htmlType="submit" style={inputStyle} onClick={this.handleAccept.bind(this, item.id)}>完成订单</Button>
              : ""}
              {this.state.id === index ? 
                <Button type="primary" htmlType="submit" style={inputStyle} onClick={this.handleAccept.bind(this, item.id)}>取消订单</Button>
              : ""}
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
    getOrderListAction: bindActionCreators(getOrderListAction, dispatch),
    getMyOrderListAction: bindActionCreators(getMyOrderListAction, dispatch),
    publishOrderAction: bindActionCreators(publishOrderAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);