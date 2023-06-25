import Review from "./review";

type Props = {
  reviews: Review[] | undefined;
};

export default function ReviewSection({ reviews }: Props) {
  return (
    <section className='spaced-24'>
      {reviews ? (
        reviews.map((review: Review) => {
          return <Review key={review.id} review={review} />;
        })
      ) : (
        <div>Нет отзывов. Оставьте первый!</div>
      )}
    </section>
  );
}
