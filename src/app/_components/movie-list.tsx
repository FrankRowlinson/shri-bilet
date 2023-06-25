"use client";

import classNames from "classnames";

import styles from "./movie-list.module.css";
import { Error, Loader, MovieCard } from "../_shared-components/";
import { useGetMoviesForMainPageQuery } from "@/store/services/moviesApi";
import { useDebounce } from "use-debounce";

type ListProps = {
  search: SearchState;
};

export function MovieList({ search }: ListProps) {
  const [debouncedSearch] = useDebounce(search, 800, {
    equalityFn: (left, right) => {
      return (
        left.cinema === right.cinema &&
        left.genre === right.genre &&
        left.title === right.title
      );
    },
  });

  const { title, genre, cinema } = debouncedSearch;

  const {
    data: movies,
    isLoading,
    error,
  } = useGetMoviesForMainPageQuery(cinema);

  if (isLoading) {
    return <Loader />;
  }

  if (!movies || error) {
    return (
      <Error>Не удалось загрузить список фильмов. Попробуйте еще раз</Error>
    );
  }

  return (
    <section className={classNames(styles.container, "spaced")}>
      {movies
        .filter((movie: Movie) => {
          return !genre || movie.genre === genre;
        })
        .filter((movie: Movie) => {
          return (
            !title || movie.title.toLowerCase().includes(title.toLowerCase())
          );
        })
        .map((movie: Movie) => {
          return <MovieCard movie={movie} key={movie.id} variant='regular' />;
        })}
    </section>
  );
}
