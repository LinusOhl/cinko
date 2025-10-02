import { Flex, Paper, Stack, Text } from "@mantine/core";
import { getFullIcon } from "../../../components/MovieRating/helpers";
import { useAuth } from "../../../hooks/useAuth";
import type { MovieReviewWithRating } from "../types";
import { DeleteReviewButton } from "./DeleteReviewButton";
import { UpdateReviewButton } from "./UpdateReviewButton";

interface MovieReviewProps {
  review: MovieReviewWithRating;
}

export const MovieReview = ({ review }: MovieReviewProps) => {
  const { user } = useAuth();

  return (
    <Paper key={review.id} p={"sm"}>
      <Stack>
        <Flex justify={"space-between"}>
          {getFullIcon(review.rating)}

          {user && review.user_id === user.id && (
            <Flex gap={"sm"}>
              <UpdateReviewButton
                initialValue={review.text}
                reviewId={review.id}
                userId={user.id}
              />

              <DeleteReviewButton reviewId={review.id} userId={user.id} />
            </Flex>
          )}
        </Flex>

        <Text>{review.text}</Text>

        <Text c={"cinkoGrey.3"} size="sm">
          Written by {review.user_id.slice(0, 4)}
        </Text>
      </Stack>
    </Paper>
  );
};
