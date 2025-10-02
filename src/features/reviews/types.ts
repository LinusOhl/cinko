export type MovieReview = {
  id: string;
  text: string;
  movie_id: number;
  user_id: string;
  created_at: string;
};

export type MovieReviewWithRating = MovieReview & {
  rating: number;
};
