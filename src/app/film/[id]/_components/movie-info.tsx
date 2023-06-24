import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import classNames from "classnames";
import { RootState } from "@/store/store";

import { Modal, QuantityCounter } from "@/app/_shared-components";

import styles from "./movie-info.module.css";
import { cartActions } from "@/store/features/cart";
import { selectTicketAmount } from "@/store/features/cart/selectors";
import { useAppDispatch } from "@/store/store";
import { GENRES } from "@/constants";

type Props = {
  movie: Movie;
};

export default function MovieInfo({ movie }: Props) {
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
      <div className={classNames("paper", styles.card)}>
        <Image
          src={movie.posterUrl}
          alt=''
          width={300}
          height={375}
          className={styles.poster}
        />
        <div className={styles.info}>
          <div className={styles.header}>
            <h1>{movie.title}</h1>
            <QuantityCounter
              count={count}
              increment={() => dispatch(cartActions.addTicket(movie.id))}
              decrement={removeTicket}
            />
          </div>
          <div className='spaced'>
            <div className='flex'>
              <h4>Жанр:</h4>
              <p className={styles.feature}>{GENRES[movie.genre]}</p>
            </div>
            <div className='flex'>
              <h4>Год выпуска:</h4>
              <p className={styles.feature}>{movie.releaseYear}</p>
            </div>
            <div className='flex'>
              <h4>Рейтинг:</h4>
              <p className={styles.feature}>{movie.rating}</p>
            </div>
            <div className='flex'>
              <h4>Режиссер:</h4>
              <p className={styles.feature}>{movie.director}</p>
            </div>
          </div>
          <div className={classNames(styles.description, "spaced")}>
            <h4>Описание</h4>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}