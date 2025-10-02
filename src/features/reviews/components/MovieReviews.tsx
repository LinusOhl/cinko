import { Box, Divider, Title } from "@mantine/core";
import { useParams } from "@tanstack/react-router";
import { useMovieReviews } from "../hooks/useMovieReviews";
import { CreateReviewForm } from "./CreateReviewForm";
import { MovieReview } from "./MovieReview";

interface MovieReviewsProps {
  userId?: string;
}

export const MovieReviews = ({ userId }: MovieReviewsProps) => {
  const { movieId } = useParams({ from: "/movies/$movieId/details" });

  const { data: reviews } = useMovieReviews(movieId);

  return (
    <Box mt={"xl"}>
      <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
        Reviews
      </Title>

      {userId && (
        <>
          <CreateReviewForm userId={userId} />

          <Divider my={"md"} />
        </>
      )}

      {reviews?.map((review) => (
        <MovieReview key={review.id} review={review} />
      ))}
    </Box>
  );
};
