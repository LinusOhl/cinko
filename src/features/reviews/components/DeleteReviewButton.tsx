import { Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "@tanstack/react-router";
import { useDeleteMovieReview } from "../hooks/useDeleteMovieReview";

interface DeleteReviewButtonProps {
  userId: string;
  reviewId: string;
}

export const DeleteReviewButton = ({
  userId,
  reviewId,
}: DeleteReviewButtonProps) => {
  const { movieId } = useParams({ from: "/movies/$movieId/details" });

  const [opened, { open, close }] = useDisclosure();

  const deleteMovieReviewMutation = useDeleteMovieReview();

  const handleDeleteReview = () => {
    if (!reviewId || !userId) return;

    deleteMovieReviewMutation.mutate({
      reviewId,
      movieId,
      userId,
    });

    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text fw={500} fz={"lg"}>
            Delete review
          </Text>
        }
      >
        <Text>Are you sure you want to delete your review?</Text>

        <Flex gap={"sm"} mt={"sm"}>
          <Button
            color="cinkoGrey"
            variant="light"
            onClick={() => close()}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            color="cinkoRed"
            variant="light"
            onClick={() => handleDeleteReview()}
            fullWidth
          >
            Delete
          </Button>
        </Flex>
      </Modal>

      <Button
        size="compact-sm"
        color="cinkoRed"
        variant="subtle"
        onClick={() => open()}
      >
        Delete
      </Button>
    </>
  );
};
