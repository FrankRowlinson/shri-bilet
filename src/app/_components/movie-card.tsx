import classNames from "classnames";
import { useSelector } from "react-redux";
import Image from "next/image";

import { cartActions } from "@/store/features/cart";
import { selectTicketAmount } from "@/store/features/cart/selectors";
import { RootState, useAppDispatch } from "@/store/store";
import { GENRES } from "@/constants";
import QuantityCounter from "@/app/_shared-components/quantity-counter";

import styles from "./movie-card.module.css";

type CardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: CardProps) {
  const count = useSelector(
    (state: RootState) => selectTicketAmount(state, movie.id) || 0
  );
  const dispatch = useAppDispatch();

  const addTicket = () => dispatch(cartActions.addTicket(movie.id));
  const removeTicket = () => dispatch(cartActions.removeTicket(movie.id));

  return (
    <div className={classNames("paper", styles.card)}>
      <Image
        className={styles.image}
        src={movie.posterUrl}
        alt=''
        width={100}
        height={120}
      />
      <div>
        <h3 className={styles.title}>{movie.title}</h3>
        <p>
          <i>{GENRES[movie.genre]}</i>
        </p>
      </div>
      <QuantityCounter
        count={count}
        increment={addTicket}
        decrement={removeTicket}
      />
    </div>
  );
}
