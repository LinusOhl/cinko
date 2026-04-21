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
import { ratingCategories, scoreMarks } from "./helpers";

export const RateMovie = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [overallValue, setOverallValue] = useState<number>(0);

  const [ratings, setRatings] = useState<Record<string, number>>(
    Object.fromEntries(ratingCategories.map((cat) => [cat.key, 1])),
  );

  const handleOverallRatingChange = (value: number) => {
    // Reset all individual ratings
    setRatings(Object.fromEntries(ratingCategories.map((cat) => [cat.key, 1])));

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
                  scoreMarks.find((mark) => mark.value === val)!.label
                }
                marks={scoreMarks}
                color={category.color}
                styles={{ markLabel: { display: "none" } }}
              />
            </Stack>
          ))}
        </Stack>
      </Modal>

      <Button color="cinkoYellow" onClick={open}>
        Rate movie
      </Button>
    </>
  );
};
