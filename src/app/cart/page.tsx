"use client";

import classNames from "classnames";

import {
  selectMovieIds,
  selectTotalTickets,
} from "@/store/features/cart/selectors";
import { useGetMoviesForCartQuery } from "@/store/services/moviesApi";
import { useAppSelector } from "@/store/store";

import styles from "./page.module.css";

import { Error, Loader, MovieCard } from "../_shared-components/";

export default function Cart() {
  const ids = useAppSelector((state) => selectMovieIds(state));
  const amount = useAppSelector((state) => selectTotalTickets(state));
  const { data, isLoading, error } = useGetMoviesForCartQuery(ids);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <Error>Корзина пуста...</Error>;
  }

  return (
    <section className={styles.container}>
      <div className={classNames("spaced")}>
        {data
          .filter((movie: Movie) => ids.includes(movie.id))
          .map((movie: Movie) => {
            return <MovieCard key={movie.id} variant='cart' movie={movie} />;
          })}
        <div className={styles.filler}></div>
      </div>
      <footer className={classNames(styles.total, "paper")}>
        <h3>Итого билетов:</h3>
        <h3>{amount}</h3>
      </footer>
    </section>
  );
}
