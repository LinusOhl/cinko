import { Group, Stack, Tabs, Text, useMantineTheme } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  globalRatingsQueryOptions,
  userRatingQueryOptions,
} from "~/server/db/ratings/ratings.queries";
import { RatingScores } from "./MovieRatings.parts";

interface MovieRatingsProps {
  movieId: number;
}

export const MovieRatings = ({ movieId }: MovieRatingsProps) => {
  const theme = useMantineTheme();

  const { data: globalRatings } = useSuspenseQuery(
    globalRatingsQueryOptions(movieId),
  );
  const { data: userRating } = useSuspenseQuery(
    userRatingQueryOptions(movieId),
  );

  return (
    <Stack gap="xs">
      <Tabs defaultValue="global" color="cinkoBlue">
        <Tabs.List mb="md" grow>
          <Tabs.Tab value="global">
            <Stack ta="center" gap="xs">
              <Text fw={700}>CINKO rating</Text>

              <Group
                align="center"
                justify="center"
                gap="0.2rem"
                bg="white"
                bdrs="md"
              >
                <IconStarFilled color={theme.black} size={theme.fontSizes.sm} />

                <Text fz="h5" fw={600} c="black">
                  {globalRatings._avg.overallScore
                    ? globalRatings._avg.overallScore
                    : "?"}
                  /5
                </Text>
              </Group>
            </Stack>
          </Tabs.Tab>

          <Tabs.Tab value="user">
            <Stack ta="center" gap="xs">
              <Text fw={700}>Your rating</Text>

              <Group
                align="center"
                justify="center"
                gap="0.2rem"
                bg="white"
                bdrs="md"
              >
                <IconStarFilled color={theme.black} size={theme.fontSizes.sm} />

                <Text fz="h5" fw={600} c="black">
                  {userRating ? userRating.overallScore : "?"}
                  /5
                </Text>
              </Group>
            </Stack>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="global">
          <RatingScores
            actingScore={3}
            cinematographyScore={3}
            directionScore={3}
            editingScore={3}
            musicScore={3}
            productionDesignScore={3}
            soundScore={3}
            visualEffectsScore={3}
            writingScore={3}
          />
        </Tabs.Panel>

        <Tabs.Panel value="user">
          <Stack gap="xs">
            {userRating ? (
              <RatingScores
                actingScore={userRating.actingScore}
                cinematographyScore={userRating.cinematographyScore}
                directionScore={userRating.directionScore}
                editingScore={userRating.editingScore}
                musicScore={userRating.musicScore}
                productionDesignScore={userRating.productionDesignScore}
                soundScore={userRating.soundScore}
                visualEffectsScore={userRating.visualEffectsScore}
                writingScore={userRating.writingScore}
              />
            ) : (
              <Text>Rate the movie to see a breakdown of your rating.</Text>
            )}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
