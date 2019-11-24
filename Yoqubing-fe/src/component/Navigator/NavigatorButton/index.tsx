import React from "react";
import styles from "./index.module.less";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { Tooltip } from "antd";
import { LocationDescriptor } from "history";

class NavigatorButton extends React.Component<{title: string, icon: any, href: LocationDescriptor<any>} & RouteComponentProps, any> {
  render() {
    let className = styles.defaultBox + " " + styles.navButton;
    if (this.props.location.pathname.indexOf(this.props.href.toString()) !== -1 && !(this.props.href.toString() === "/" && this.props.location.pathname !== "/")) {
      className += " " + styles.activeButton;
    }
    return (
      <Tooltip title={this.props.title} placement="left">
        <NavLink to={this.props.href}>
          <div className={className}>
            {this.props.icon}
          </div>
        </NavLink>
      </Tooltip>
    );
  }
}

export default withRouter(NavigatorButton);