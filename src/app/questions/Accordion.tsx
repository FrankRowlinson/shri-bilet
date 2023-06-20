"use client";

import { useState } from "react";
import classNames from "classnames";

import styles from "./Accordion.module.css";
import Image from "next/image";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  const contentClass = classNames({
    [styles.content]: true,
    [styles.open]: open,
  });
  const iconClass = classNames({
    [styles.icon]: true,
    [styles.open]: open,
  });
  return (
    <div
      className={classNames("paper", styles.accordion)}
      onClick={() => {
        setOpen((prev) => !prev);
      }}
    >
      <div className={styles.title}>
        <h2>{title}</h2>
        <Image
          className={iconClass}
          src='icons/arrow.svg'
          alt=''
          width={32}
          height={32}
        />
      </div>
      <div className={contentClass}>
        <div>{children}</div>
      </div>
    </div>
  );
}
