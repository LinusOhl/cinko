import { Box, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { MovieBanner } from "~/components/features/movies/MovieBanner";
import { IMAGES_BASE_URL } from "~/helpers";
import { movieQueryOptions } from "~/queries/movies";

/**
 * TODO:
 * This page will only hold the 'Overview' section of the movie (like IMDb)
 * /credits will hold a list of the movies credits ('Overview' is still above)
 * /details will hold extra info about the movie ('Overview' is still above)
 */

export const Route = createFileRoute("/movies/$movieId")({
  params: {
    parse: (params) => ({
      movieId: z.string().parse(params.movieId),
    }),
  },
  loader: ({ params: { movieId }, context }) =>
    context.queryClient.ensureQueryData(movieQueryOptions(movieId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(movieId));

  const movieReleaseYear = movie.release_date.slice(0, 4);

  return (
    <Stack my={"xl"}>
      <MovieBanner movie={movie} />

      <Group align="flex-start" wrap="nowrap">
        {/* TODO: set up fallback src/element */}
        <Box w={250}>
          <div
            style={{
              backgroundImage: `url(${IMAGES_BASE_URL}/w500/${movie.poster_path})`,
              width: 250,
            }}
            className={"movieCardImageBox"}
          >
            <div className={"movieCardBorderBox"} />
          </div>
        </Box>

        <Stack>
          <Title order={1} style={{ textWrap: "balance" }}>
            {movie.title}
          </Title>

          <Group gap={"xs"}>
            <Text size="sm" c={"cinkoGrey.3"}>
              {movieReleaseYear}
            </Text>

            <IconCircleFilled size={6} color="#bba6a6" />

            {/* Runtime */}
            {/* <Text size="sm" c={"cinkoGrey.3"}>
              {movie.runtime}min
            </Text> */}

            <IconCircleFilled size={6} color="#bba6a6" />

            {/* Genres */}
            {/* {movie.genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="light"
                size="sm"
                color="cinkoYellow"
              >
                {genre.name}
              </Badge>
            ))} */}
          </Group>

          <Text c={"cinkoGrey.3"}>{movie.overview}</Text>
        </Stack>
      </Group>
    </Stack>
  );
}
