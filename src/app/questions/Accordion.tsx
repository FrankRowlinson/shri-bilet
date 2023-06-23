"use client";

import { SetStateAction, useState } from "react";
import classNames from "classnames";

import styles from "./Accordion.module.css";
import Image from "next/image";

interface Props {
  title: string;
  id: number;
  active: number | undefined;
  setActive: React.Dispatch<SetStateAction<number | undefined>>;
  children: React.ReactNode;
}

export default function Accordion({
  title,
  id,
  setActive,
  active,
  children,
}: Props) {
  const contentClass = classNames({
    [styles.content]: true,
    [styles.open]: active === id,
  });

  const iconClass = classNames({
    [styles.icon]: true,
    [styles.open]: active === id,
  });

  return (
    <div
      className={classNames("paper", styles.accordion)}
      onClick={() => {
        setActive((currentActive) => (currentActive === id ? undefined : id));
      }}
    >
      <div className={styles.title}>
        <h2>{title}</h2>
        <Image
          className={iconClass}
          src='icons/arrow.svg'
          alt=''
          width={24}
          height={24}
        />
      </div>
      <div className={contentClass}>
        <div>{children}</div>
      </div>
    </div>
  );
}