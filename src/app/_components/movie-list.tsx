"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";

import { getAllMovies, getMoviesByCinemaId } from "@/api/movies";

import QuantityCounter from "@/app/_shared-components/quantity-counter";
import styles from "./movie-list.module.css";
import Image from "next/image";
import { GENRES } from "@/constants";

type CardProps = {
  movie: Movie;
};

function MovieCard({ movie }: CardProps) {
  const [count, setCount] = useState(0);
  return (
    <div className={classNames("paper", styles.card)}>
      <Image
        className={styles.image}
        src={movie.posterUrl}
        alt=''
        width={100}
        height={120}
      />
      <div>
        <h3 className={styles.title}>{movie.title}</h3>
        <p>
          <i>{GENRES[movie.genre]}</i>
        </p>
      </div>
      <QuantityCounter count={count} setCount={setCount} />
    </div>
  );
}

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
