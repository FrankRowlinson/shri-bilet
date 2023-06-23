"use client";

import classNames from "classnames";

import {
  selectMovieIds,
  selectTotalTickets,
} from "@/store/features/cart/selectors";
import { useGetMoviesForCartQuery } from "@/store/services/moviesApi";
import { useAppSelector } from "@/store/store";

import styles from "./page.module.css";

import MovieCard from "../_shared-components/movie-card";

type Props = {};

export default function Cart({}: Props) {
  const ids = useAppSelector((state) => selectMovieIds(state));
  const amount = useAppSelector((state) => selectTotalTickets(state));
  const { data, isLoading, error } = useGetMoviesForCartQuery(ids);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Not found...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={classNames("spaced")}>
        {data
          .filter((movie: Movie) => ids.includes(movie.id))
          .map((movie: Movie) => {
            return <MovieCard key={movie.id} variant='cart' movie={movie} />;
          })}
        <div className={styles.filler}></div>
      </div>
      <div className={classNames(styles.total, "paper")}>
        <h3>Итого билетов:</h3>
        <h3>{amount}</h3>
      </div>
    </div>
  );
}
