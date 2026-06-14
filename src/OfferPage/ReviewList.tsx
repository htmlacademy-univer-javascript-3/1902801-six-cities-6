import { Review } from '../mocks/reviews';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((r) => (
          <ReviewItem key={r.id} {...r} />
        ))}
      </ul>
    </section>
  );
}
