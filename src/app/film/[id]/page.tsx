"use client";

import classNames from "classnames";

import { Loader, QuantityCounter } from "@/app/_shared-components";
import { useGetMovieQuery } from "@/store/services/moviesApi";

import styles from "./page.module.css";
import Image from "next/image";
import MovieInfo from "./_components/movie-info";

type Props = { params: { id: string } };

function FilmPage({ params }: Props) {
  const { data: movie, isLoading, error } = useGetMovieQuery(params.id);

  if (isLoading) {
    return <Loader />;
  }

  if (!movie || error) {
    return <div>Страница не найдена</div>;
  }

  return (
    <section className='spaced'>
      <MovieInfo movie={movie} />
    </section>
  );
}

export default FilmPage;
