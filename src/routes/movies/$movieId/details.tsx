import {
  Avatar,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Review } from "~/components/reviews/Review";
import { CustomLink } from "~/components/shared/CustomLink";
import { IMAGES_BASE_URL } from "~/helpers";
import { movieQueryOptions } from "~/server/tmdb/movies/movies.queries";

export const Route = createFileRoute("/movies/$movieId/details")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      movieQueryOptions(params.movieId, ["credits"]),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();

  const theme = useMantineTheme();

  const { data: movie } = useSuspenseQuery(
    movieQueryOptions(movieId, ["credits"]),
  );

  return (
    <Stack gap="xl" mb="xl">
      <Stack>
        <CustomLink
          to="/movies/$movieId/reviews"
          params={{ movieId }}
          fz="h2"
          ff="heading"
          fw={700}
          c="white"
        >
          <Group gap="xs">
            Reviews
            <IconChevronRight color={theme.colors.cinkoYellow[6]} />
          </Group>
        </CustomLink>

        <SimpleGrid cols={2}>
          <Review author="Simon Belmont" title="It was very good!" simplified />
        </SimpleGrid>
      </Stack>

      <Stack>
        <CustomLink
          to="/movies/$movieId/credits"
          params={{ movieId }}
          fz="h2"
          ff="heading"
          fw={700}
          c="white"
        >
          <Group gap="xs">
            Cast & Crew
            <IconChevronRight color={theme.colors.cinkoYellow[6]} />
          </Group>
        </CustomLink>

        <Grid justify="space-between">
          {movie.credits?.cast.slice(0, 10).map((cast) => (
            <Grid.Col key={cast.id} span={6}>
              <Group>
                <Avatar
                  src={`${IMAGES_BASE_URL}/w185/${cast.profile_path}`}
                  size="xl"
                />

                <Stack gap={"xs"}>
                  <CustomLink
                    to="/people/$personId"
                    params={{ personId: cast.id.toString() }}
                    preload={false}
                    c="white"
                    fw={500}
                  >
                    {cast.name}
                  </CustomLink>
                  <Text>{cast.character}</Text>
                </Stack>
              </Group>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
