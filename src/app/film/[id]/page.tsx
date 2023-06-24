"use client";

import { useGetMovieQuery } from "@/store/services/moviesApi";

import { Loader } from "@/app/_shared-components";

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
    return <div>Страница не найдена</div>;
  }

  return (
    <section className='spaced-24'>
      <MovieInfo movie={movie} />
      {reviewsError ? (
        <div className='paper'>Не удалось загрузить отзывы</div>
      ) : (
        <ReviewSection reviews={reviews} />
      )}
    </section>
  );
}

export default FilmPage;
