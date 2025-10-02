import { Box, Divider, Flex, Paper, Stack, Text, Title } from "@mantine/core";
import { useParams } from "@tanstack/react-router";
import { getFullIcon } from "../../../components/MovieRating/helpers";
import { useMovieReviews } from "../hooks/useMovieReviews";
import { CreateReviewForm } from "./CreateReviewForm";
import { DeleteReviewButton } from "./DeleteReviewButton";
import { UpdateReviewButton } from "./UpdateReviewButton";

interface MovieReviewsProps {
  userId?: string;
}

export const MovieReviews = ({ userId }: MovieReviewsProps) => {
  const { movieId } = useParams({ from: "/movies/$movieId/details" });

  const { data: reviews } = useMovieReviews(movieId);
  const userReview = reviews?.find((review) => review.user_id === userId);

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
        <Paper key={review.id} p={"sm"}>
          <Stack>
            <Flex justify={"space-between"}>
              {getFullIcon(review.rating)}

              {review.user_id === userId && userReview && (
                <Flex gap={"sm"}>
                  <UpdateReviewButton
                    initialValue={userReview.text}
                    reviewId={userReview.id}
                    userId={userId}
                  />

                  <DeleteReviewButton
                    reviewId={userReview.id}
                    userId={userId}
                  />
                </Flex>
              )}
            </Flex>

            <Text>{review.text}</Text>

            <Text c={"cinkoGrey.3"} size="sm">
              Written by {review.user_id.slice(0, 4)}
            </Text>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};
