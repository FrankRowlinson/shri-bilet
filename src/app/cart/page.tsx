"use client";

import classNames from "classnames";

import { selectMovieIds } from "@/store/features/cart/selectors";
import { useGetMoviesForCartQuery } from "@/store/services/moviesApi";
import { useAppSelector } from "@/store/store";

import styles from "./page.module.css";

import { Error, Loader, MovieCard } from "../_shared-components/";
import CartTotal from "./_page-components/cart-total";

export default function Cart() {
  const ids = useAppSelector((state) => selectMovieIds(state));
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
      <CartTotal />
    </section>
  );
}
