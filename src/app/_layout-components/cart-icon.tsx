"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectTotalTickets } from "@/store/features/cart/selectors";

import styles from "./cart-icon.module.css";
import Link from "next/link";

export function CartIcon() {
  const count = useSelector((state: RootState) => selectTotalTickets(state));
  return (
    <Link href='/cart'>
      <div className={styles.container}>
        {count !== 0 && <div className={styles.counter}>{count}</div>}
        <Image src='icons/cart.svg' alt='' width={28} height={28} />
      </div>
    </Link>
  );
}
