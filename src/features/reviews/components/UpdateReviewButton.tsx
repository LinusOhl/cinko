import { Button, Modal, Stack, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useUpdateMovieReview } from "../hooks/useUpdateMovieReview";

interface UpdateReviewButtonProps {
  initialValue?: string;
  reviewId: string;
  userId: string;
}

export const UpdateReviewButton = ({
  initialValue,
  reviewId,
  userId,
}: UpdateReviewButtonProps) => {
  const { movieId } = useParams({ from: "/movies/$movieId/details" });

  const [opened, { open, close }] = useDisclosure();

  const [value, setValue] = useState(initialValue ?? "");
  const updatedMovieReviewMutation = useUpdateMovieReview();

  const handleUpdateReview = () => {
    updatedMovieReviewMutation.mutate({
      text: value,
      movieId,
      reviewId,
      userId,
    });

    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={"Edit review"}>
        <Stack gap={"sm"}>
          <Textarea
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
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
            disabled={!userId || value.trim().length === 0}
          >
            Save
          </Button>
        </Stack>
      </Modal>

      <Button
        size="compact-sm"
        color="cinkoBlue"
        variant="subtle"
        onClick={() => open()}
      >
        Update
      </Button>
    </>
  );
};
