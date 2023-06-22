"use client";

import classNames from "classnames";

import styles from "./filter.module.css";

export function Filter({ children }: { children: React.ReactNode }) {
  return (
    <div className={classNames(styles.container, "paper")}>
      <div className={classNames(styles.filters, "spaced")}>{children}</div>
    </div>
  );
}
