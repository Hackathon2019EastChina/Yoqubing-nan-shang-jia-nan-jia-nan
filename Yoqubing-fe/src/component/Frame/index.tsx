import React from "react";
import styles from "./index.module.less";

import Navigator from "../Navigator";

export default function Frame(props: {WrappedComponent: any, Boxed?: boolean}) {
  return (
    <div className={styles.whole}>
      <div className={styles.container}>
        <Navigator />
        <div className={`${styles.content} ${props.Boxed ? styles.defaultBox : ""}`}>
          {props.WrappedComponent}
        </div>
      </div>
    </div>
  );
}