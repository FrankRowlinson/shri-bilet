"use client";

import { useGetMovieQuery } from "@/store/services/moviesApi";

import { Error, Loader } from "@/app/_shared-components";

import MovieInfo from "./_components/movie-info";
import ReviewSection from "./_components/review-section";
import { useGetReviewsForMovieQuery } from "@/store/services/reviewsApi";

type Props = { params: { id: string } };

function FilmPage({ params }: Props) {
  const id = params.id;
  const {
    data: movie,
    isLoading: isMovieLoading,
    error: movieError,
  } = useGetMovieQuery(id);
  const {
    data: reviews,
    isLoading: areReviewsLoading,
    error: reviewsError,
  } = useGetReviewsForMovieQuery(id);

  if (isMovieLoading || areReviewsLoading) {
    return <Loader />;
  }

  if (!movie || movieError) {
    return <Error>Страница не найдена</Error>;
  }

  return (
    <section className='spaced-24'>
      <MovieInfo movie={movie} />
      {reviewsError ? (
        <Error>Не удалось загрузить отзывы</Error>
      ) : (
        <ReviewSection reviews={reviews} />
      )}
    </section>
  );
}

export default FilmPage;
