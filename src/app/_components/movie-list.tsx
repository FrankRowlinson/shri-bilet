"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";

import { getAllMovies, getMoviesByCinemaId } from "@/api/movies";

import styles from "./movie-list.module.css";
import MovieCard from "./movie-card";

type ListProps = {
  search: SearchState;
};

export function MovieList({ search }: ListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const { title, genre, cinema } = search;

  useEffect(() => {
    const fetchData = async () => {
      if (cinema) {
        const movies = await getMoviesByCinemaId(cinema);
        setMovies(movies);
      } else {
        const movies = await getAllMovies();
        setMovies(movies);
      }
    };
    fetchData();
  }, [cinema]);

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
              !title ||
              movie.title.toLowerCase().startsWith(title.toLowerCase())
            );
          })
          .map((movie: Movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })
      )}
    </div>
  );
}
