import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useMovieReviews } from "../../hooks/useMovieReviews";
import { useReviewMovie } from "../../hooks/useReviewMovie";
import { useUpdateMovieReview } from "../../hooks/useUpdateMovieReview";
import { getFullIcon } from "../MovieRating/helpers";

interface MovieReviewsProps {
  userId?: string;
}

export const MovieReviews = ({ userId }: MovieReviewsProps) => {
  const { movieId } = useParams({ from: "/movies/$movieId/details" });

  const { data: reviews } = useMovieReviews(movieId);
  const movieReviewMutation = useReviewMovie();
  const updateMovieReviewMutation = useUpdateMovieReview();

  const [opened, { open, close }] = useDisclosure();
  const [reviewValue, setReviewValue] = useState("");
  const [updatedReviewValue, setUpdatedReviewValue] = useState("");

  const handleReviewSubmit = () => {
    movieReviewMutation.mutate({
      text: reviewValue,
      movieId,
      userId,
    });

    setReviewValue("");
  };

  const handleUpdateReview = () => {
    const userReview = reviews?.find((review) => review.user_id === userId);
    if (!userId || !userReview) return;

    updateMovieReviewMutation.mutate({
      text: updatedReviewValue,
      reviewId: userReview.id,
      movieId: movieId,
      userId: userId,
    });

    close();
  };

  const modalOpen = () => {
    const userReview = reviews?.find((review) => review.user_id === userId);
    if (!userReview) return;

    setUpdatedReviewValue(userReview.text);

    open();
  };

  const modalClose = () => {
    setUpdatedReviewValue("");
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={modalClose} title={"Edit review"}>
        <Stack gap={"sm"}>
          <Textarea
            value={updatedReviewValue}
            onChange={(event) =>
              setUpdatedReviewValue(event.currentTarget.value)
            }
            label={"Update your review"}
            resize="vertical"
            size="md"
            minRows={4}
            disabled={!userId}
            autosize
          />

          <Button
            color="cinkoBlue.7"
            style={{ alignSelf: "flex-end" }}
            onClick={handleUpdateReview}
            disabled={!userId || updatedReviewValue.trim().length <= 0}
          >
            Save
          </Button>
        </Stack>
      </Modal>

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
            <Stack>
              <Flex justify={"space-between"}>
                {getFullIcon(review.rating)}

                {review.user_id === userId && (
                  <Flex gap={"sm"}>
                    <Button
                      size="compact-sm"
                      color="cinkoBlue"
                      variant="subtle"
                      onClick={() => {
                        console.log("updating review", review.id);
                        modalOpen();
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      size="compact-sm"
                      color="cinkoRed"
                      variant="subtle"
                      onClick={() => console.log("deleting review", review.id)}
                    >
                      Delete
                    </Button>
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
    </>
  );
};
