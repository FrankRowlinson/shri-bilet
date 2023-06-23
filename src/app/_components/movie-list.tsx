"use client";

import classNames from "classnames";

import styles from "./movie-list.module.css";
import MovieCard from "../_shared-components/movie-card";
import { useGetMoviesForMainPageQuery } from "@/store/services/moviesApi";

type ListProps = {
  search: SearchState;
};

export function MovieList({ search }: ListProps) {
  const { title, genre, cinema } = search;

  const {
    data: movies,
    isLoading,
    error,
  } = useGetMoviesForMainPageQuery(cinema);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movies || error) {
    return null;
  }

  return (
    <div className={classNames(styles.container, "spaced")}>
      {movies.length === 0 ? (
        <div>Loading...</div>
      ) : (
        movies
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
          })
      )}
    </div>
  );
}
