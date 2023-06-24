"use client";

import Image from "next/image";
import Link from "next/link";

import { useAppSelector } from "@/store/store";
import { selectTotalTickets } from "@/store/features/cart/selectors";

import styles from "./cart-icon.module.css";

export function CartIcon() {
  const count = useAppSelector((state) => selectTotalTickets(state));
  return (
    <Link href='/cart'>
      <div className={styles.container}>
        {count !== 0 && <div className={styles.counter}>{count}</div>}
        <Image src='/icons/cart.svg' alt='' width={28} height={28} />
      </div>
    </Link>
  );
}
