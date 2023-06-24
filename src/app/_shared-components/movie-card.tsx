import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import { cartActions } from "@/store/features/cart";
import { selectTicketAmount } from "@/store/features/cart/selectors";
import { RootState, useAppDispatch } from "@/store/store";
import { GENRES } from "@/constants";

import { Modal, QuantityCounter } from "./";
import styles from "./movie-card.module.css";

type CardProps = {
  movie: Movie;
  variant: "regular" | "cart";
};

export function MovieCard({ movie, variant }: CardProps) {
  const [approvalOpen, setApprovalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const count = useSelector(
    (state: RootState) => selectTicketAmount(state, movie.id) || 0
  );

  const removeTicket = () => {
    if (count === 1) {
      setApprovalOpen(true);
    } else {
      dispatch(cartActions.removeTicket(movie.id));
    }
  };
  const deleteTicket = () => setApprovalOpen(true);

  return (
    <>
      {approvalOpen && (
        <Modal
          onAccept={() => {
            dispatch(cartActions.deleteTicket(movie.id));
            setApprovalOpen(false);
          }}
          onDecline={() => setApprovalOpen(false)}
        >
          <Modal.Header>Удаление билета</Modal.Header>
          <Modal.Content>Вы уверены, что хотите удалить билет?</Modal.Content>
          <Modal.Actions acceptText='Да' declineText='Нет' />
        </Modal>
      )}
      <div className={classNames("paper", styles.container)}>
        <div className={styles.card}>
          <Image
            className={styles.poster}
            src={movie.posterUrl}
            alt=''
            width={100}
            height={120}
          />
          <div>
            <h3 className={styles.title}>
              <Link href={`film/${movie.id}`}>{movie.title}</Link>
            </h3>
            <p>
              <i>{GENRES[movie.genre]}</i>
            </p>
          </div>
          <QuantityCounter
            count={count}
            increment={() => dispatch(cartActions.addTicket(movie.id))}
            decrement={removeTicket}
          />
        </div>
        {variant === "cart" && (
          <Image
            className={styles.close}
            onClick={() => deleteTicket()}
            src='icons/close.svg'
            alt=''
            width={20}
            height={20}
          />
        )}
      </div>
    </>
  );
}
