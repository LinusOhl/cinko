import {
  Alert,
  Button,
  Divider,
  Modal,
  Rating,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useRateMovieMutation } from "~/server/db/ratings/ratings.queries";
import type { TMDBMovieDetails } from "~/types/tmdb";
import { ratingCategories, scoreMarks } from "./helpers";

interface RateMovieProps {
  movie: TMDBMovieDetails;
}

export const RateMovie = ({ movie }: RateMovieProps) => {
  const { mutate, isPending } = useRateMovieMutation();

  const [opened, { open, close }] = useDisclosure(false);
  const [overallValue, setOverallValue] = useState<number>(0);

  const [ratings, setRatings] = useState<Record<string, number>>(
    Object.fromEntries(ratingCategories.map((cat) => [cat.key, 1])),
  );

  const handleOverallRatingChange = (value: number) => {
    // Reset all individual ratings
    setRatings(
      Object.fromEntries(ratingCategories.map((cat) => [cat.key, value])),
    );

    setOverallValue(value);
  };

  const handleRatingChange = (key: string, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleOnClose = () => {
    // Reset all ratings
    setRatings(Object.fromEntries(ratingCategories.map((cat) => [cat.key, 1])));
    setOverallValue(0);

    close();
  };

  const handleSubmit = () => {
    mutate({
      data: {
        movie,
        ratings,
      },
    });

    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleOnClose}
        title={
          <Text fz="xl" fw={500}>
            Rate movie
          </Text>
        }
      >
        <Stack p="sm">
          <Text fw={500} fz="lg">
            Overall rating
          </Text>

          <Rating
            value={overallValue}
            onChange={(val) => handleOverallRatingChange(val)}
            allowClear
          />

          <Divider label="or" />

          {overallValue > 0 && (
            <Alert title="Fine-tuning the rating">
              You must deselect your overall rating of the movie to enable
              fine-tuning.
            </Alert>
          )}

          {ratingCategories.map((category) => (
            <Stack key={category.key} gap="xs">
              <Text>{category.label}</Text>

              <Slider
                value={overallValue > 0 ? overallValue : ratings[category.key]}
                onChange={(val) => handleRatingChange(category.key, val)}
                min={1}
                max={5}
                label={(val) =>
                  scoreMarks.find((mark) => mark.value === val)?.label
                }
                marks={scoreMarks}
                color={category.color}
                styles={{ markLabel: { display: "none" } }}
                disabled={overallValue > 0}
              />
            </Stack>
          ))}

          <Button onClick={handleSubmit}>Submit rating</Button>
        </Stack>
      </Modal>

      <Button color="cinkoYellow" onClick={open} loading={isPending}>
        Rate movie
      </Button>
    </>
  );
};
