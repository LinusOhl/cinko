import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useMovieReviews } from "../../hooks/useMovieReviews";
import { useReviewMovie } from "../../hooks/useReviewMovie";

interface MovieReviewsProps {
  userId?: string;
}

export const MovieReviews = ({ userId }: MovieReviewsProps) => {
  const { movieId } = useParams({ from: "/movies/$movieId/details" });

  const { data: reviews } = useMovieReviews(movieId);
  const movieReviewMutation = useReviewMovie();

  const [reviewValue, setReviewValue] = useState("");

  const handleReviewSubmit = () => {
    movieReviewMutation.mutate({
      text: reviewValue,
      movieId,
      userId,
    });

    setReviewValue("");
  };

  return (
    <Box mt={"xl"}>
      <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
        Reviews
      </Title>

      <Stack gap={"sm"}>
        <Textarea
          value={reviewValue}
          onChange={(event) => setReviewValue(event.currentTarget.value)}
          label={"Write a review for the movie!"}
          placeholder={
            userId ? "Review goes here..." : "Sign in to review the movie..."
          }
          resize="vertical"
          size="md"
          minRows={4}
          disabled={!userId}
          autosize
        />

        <Button
          color="cinkoBlue.7"
          style={{ alignSelf: "flex-end" }}
          onClick={handleReviewSubmit}
          disabled={!userId || reviewValue.trim().length <= 0}
        >
          Submit
        </Button>
      </Stack>

      <Divider my={"md"} />

      {reviews?.map((review) => (
        <Paper key={review.id} p={"sm"}>
          <Text>{review.text}</Text>

          <Text c={"cinkoGrey.3"} size="sm">
            Written by {review.user_id.slice(0, 4)}
          </Text>
        </Paper>
      ))}
    </Box>
  );
};
