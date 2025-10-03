import { Flex, Paper, Stack, Text } from "@mantine/core";
import { getFullIcon, getRatingName } from "../../ratings/utils/ratingHelpers";
import type { MovieReviewWithRating } from "../types";
import { DeleteReviewButton } from "./DeleteReviewButton";
import { UpdateReviewButton } from "./UpdateReviewButton";

interface MovieReviewProps {
  review: MovieReviewWithRating;
  userId?: string;
}

export const MovieReview = ({ review, userId }: MovieReviewProps) => {
  return (
    <Paper p={"sm"}>
      <Stack>
        <Flex justify={"space-between"}>
          <Flex gap={"xs"} align={"center"}>
            {getFullIcon(review.rating)}

            <Text fs={"italic"} fw={500}>
              {getRatingName(review.rating)}
            </Text>
          </Flex>

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

        <Flex justify={"space-between"}>
          <Text c={"cinkoGrey.3"} size="sm">
            Written by {review.user_id.slice(0, 4)}
          </Text>

          <Text c={"cinkoGrey.3"} size="sm">
            {new Date(review.created_at).toLocaleDateString()}
          </Text>
        </Flex>
      </Stack>
    </Paper>
  );
};
