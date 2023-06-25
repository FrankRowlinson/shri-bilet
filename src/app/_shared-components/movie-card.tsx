import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import { GENRES } from "@/constants";

import { Modal, QuantityCounter } from "./";
import styles from "./movie-card.module.css";
import useCart from "@/hooks/useCart";

type CardProps = {
  movie: Movie;
  variant: "regular" | "cart";
};

export function MovieCard({ movie, variant }: CardProps) {
  const {
    count,
    increment,
    decrement,
    deleteTicket,
    confirmationOpen,
    showConfirmationModal,
    closeConfirmationModal,
  } = useCart(movie.id);

  return (
    <>
      {confirmationOpen && (
        <Modal
          onAccept={() => {
            deleteTicket();
          }}
          onDecline={() => closeConfirmationModal()}
        >
          <Modal.Header>Удаление билета</Modal.Header>
          <Modal.Content>Вы уверены, что хотите удалить билет?</Modal.Content>
          <Modal.Actions acceptText='Да' declineText='Нет' />
        </Modal>
      )}
      <section className={classNames("paper", styles.container)}>
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
            <i>{GENRES[movie.genre]}</i>
          </div>
          <QuantityCounter
            count={count}
            increment={() => increment()}
            decrement={() => decrement()}
          />
        </div>
        {variant === "cart" && (
          <Image
            className={styles.close}
            onClick={() => showConfirmationModal()}
            src='icons/close.svg'
            alt=''
            width={20}
            height={20}
          />
        )}
      </section>
    </>
  );
}
