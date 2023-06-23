import Image from "next/image";
import styles from "./quantity-counter.module.css";
import { SetStateAction } from "react";

type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

function IconButton({ onClick, disabled, children }: ButtonProps) {
  return (
    <button
      className={styles["icon-button"]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type CounterProps = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export default function QuantityCounter({
  count,
  increment,
  decrement,
}: CounterProps) {
  return (
    <div className={styles.container}>
      <IconButton disabled={count === 0} onClick={() => decrement()}>
        <Image src='icons/minus.svg' alt='' width={10} height={10} />
      </IconButton>
      <span className={styles.counter}>{count}</span>
      <IconButton disabled={count === 30} onClick={() => increment()}>
        <strong>
          <Image src='icons/plus.svg' alt='' width={10} height={10} />
        </strong>
      </IconButton>
    </div>
  );
}
