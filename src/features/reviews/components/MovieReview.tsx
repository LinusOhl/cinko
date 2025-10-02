import { Flex, Paper, Stack, Text } from "@mantine/core";
import { getFullIcon } from "../../../components/MovieRating/helpers";
import type { MovieReviewWithRating } from "../types";
import { DeleteReviewButton } from "./DeleteReviewButton";
import { UpdateReviewButton } from "./UpdateReviewButton";

interface MovieReviewProps {
  review: MovieReviewWithRating;
  userId?: string;
}

export const MovieReview = ({ review, userId }: MovieReviewProps) => {
  return (
    <Paper key={review.id} p={"sm"}>
      <Stack>
        <Flex justify={"space-between"}>
          {getFullIcon(review.rating)}

          {userId && review.user_id === userId && (
            <Flex gap={"sm"}>
              <UpdateReviewButton
                initialValue={review.text}
                reviewId={review.id}
                userId={userId}
              />

              <DeleteReviewButton reviewId={review.id} userId={userId} />
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
