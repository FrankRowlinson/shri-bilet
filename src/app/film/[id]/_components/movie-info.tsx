import Image from "next/image";
import classNames from "classnames";

import { Modal, QuantityCounter } from "@/app/_shared-components";

import { GENRES } from "@/constants";
import useCart from "@/hooks/useCart";

import styles from "./movie-info.module.css";

type Props = {
  movie: Movie;
};

export default function MovieInfo({ movie }: Props) {
  const {
    count,
    increment,
    decrement,
    deleteTicket,
    confirmationOpen,
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
      <section className={classNames("paper", styles.card)}>
        <Image
          src={movie.posterUrl}
          alt=''
          width={300}
          height={375}
          className={styles.poster}
        />
        <div className={styles.info}>
          <header className={styles.header}>
            <h1>{movie.title}</h1>
            <QuantityCounter
              count={count}
              increment={() => increment()}
              decrement={() => decrement()}
            />
          </header>
          <dl className='spaced'>
            <div className='flex'>
              <dt>
                <h4>Жанр:</h4>
              </dt>
              <dd className={styles.feature}>{GENRES[movie.genre]}</dd>
            </div>
            <div className='flex'>
              <dt>
                <h4>Год выпуска:</h4>
              </dt>
              <dd className={styles.feature}>{movie.releaseYear}</dd>
            </div>
            <div className='flex'>
              <dt>
                <h4>Рейтинг:</h4>
              </dt>
              <dd className={styles.feature}>{movie.rating}</dd>
            </div>
            <div className='flex'>
              <dt>
                <h4>Режиссер:</h4>
              </dt>
              <dd className={styles.feature}>{movie.director}</dd>
            </div>
          </dl>
          <div className={classNames(styles.description, "spaced")}>
            <h4>Описание</h4>
            <p>{movie.description}</p>
          </div>
        </div>
      </section>
    </>
  );
}
