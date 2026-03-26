import { Rating, Stack, Text } from "@mantine/core";
import { getEmptyIcon, getFullIcon } from "./helpers";

export const RateMovie = () => {
  return (
    <Stack align="center" gap={"xs"}>
      <Text fw={500}>Rate movie</Text>

      <Rating
        emptySymbol={getEmptyIcon}
        fullSymbol={getFullIcon}
        highlightSelectedOnly
      />
    </Stack>
  );
};
