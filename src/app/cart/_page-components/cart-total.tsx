import classNames from "classnames";

import { selectTotalTickets } from "@/store/features/cart/selectors";
import { useAppSelector } from "@/store/store";

import styles from "./cart-total.module.css";

type Props = {};

export default function CartTotal({}: Props) {
  const amount = useAppSelector((state) => selectTotalTickets(state));
  return (
    <footer className={classNames(styles.total, "paper")}>
      <h3>Итого билетов:</h3>
      <h3>{amount}</h3>
    </footer>
  );
}
