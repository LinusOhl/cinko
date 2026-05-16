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
          {globalRatings._count._all > 0 ? (
            <RatingScores
              actingScore={globalRatings._avg.actingScore || 0}
              cinematographyScore={globalRatings._avg.cinematographyScore || 0}
              directionScore={globalRatings._avg.directionScore || 0}
              editingScore={globalRatings._avg.editingScore || 0}
              musicScore={globalRatings._avg.musicScore || 0}
              aestheticsScore={globalRatings._avg.aestheticsScore || 0}
              soundScore={globalRatings._avg.soundScore || 0}
              effectsScore={globalRatings._avg.effectsScore || 0}
              writingScore={globalRatings._avg.writingScore || 0}
            />
          ) : (
            <Text>Waiting for more ratings.</Text>
          )}
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
                aestheticsScore={userRating.aestheticsScore}
                soundScore={userRating.soundScore}
                effectsScore={userRating.effectsScore}
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
