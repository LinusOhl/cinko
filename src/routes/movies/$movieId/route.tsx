import { Badge, Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";
import { MovieBanner } from "~/components/features/movies/MovieBanner/MovieBanner";
import { MoviePoster } from "~/components/features/movies/MoviePoster";
import { movieQueryOptions } from "~/queries/movies";
import { useAddToWatchlistMutation } from "~/server/db/watchlist/watchlist.queries";

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

  const addToWatchlistMutation = useAddToWatchlistMutation();

  const movieReleaseYear = movie.release_date.slice(0, 4);
  const stars = movie.credits.cast.slice(0, 3);
  const directors = movie.credits.crew.filter((k) => k.job === "Director");
  const writers = movie.credits.crew.filter(
    (k) => k.job === "Writer" || k.job === "Screenplay",
  );

  return (
    <>
      <Stack my={"xl"}>
        <MovieBanner movie={movie} />

        <Group align="flex-start" wrap="nowrap">
          <Stack>
            <MoviePoster posterPath={movie.poster_path} width={250} />

            <Paper bg={"black"}>
              <Stack>
                <Button color="cinkoYellow.7">Rate movie</Button>

                <Button
                  color="cinkoBlue.6"
                  onClick={() =>
                    addToWatchlistMutation.mutate(
                      {
                        data: {
                          movie: movie,
                        },
                      },
                      { onError: ({ message }) => console.error(message) },
                    )
                  }
                >
                  Add to watchlist
                </Button>
              </Stack>
            </Paper>
          </Stack>

          <Stack>
            <Title order={1} style={{ textWrap: "balance" }}>
              {movie.title}
            </Title>

            <Group gap={"xs"}>
              <Text size="sm" c={"cinkoGrey.3"}>
                {movieReleaseYear}
              </Text>

              <IconCircleFilled size={6} color="#bba6a6" />

              <Text size="sm" c={"cinkoGrey.3"}>
                {movie.runtime}min
              </Text>

              <IconCircleFilled size={6} color="#bba6a6" />

              {movie.genres.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="light"
                  size="sm"
                  color="cinkoYellow"
                >
                  {genre.name}
                </Badge>
              ))}
            </Group>

            <Text fs={"italic"}>{movie.tagline}</Text>

            <Text c={"cinkoGrey.3"}>{movie.overview}</Text>

            <Stack gap={"xs"}>
              <Group>
                {directors.length > 1 ? (
                  <Text fw={700}>Directors</Text>
                ) : (
                  <Text fw={700}>Director</Text>
                )}

                {directors.map((director) => (
                  <Text key={director.id}>{director.name}</Text>
                ))}
              </Group>

              <Group>
                {writers.length > 1 ? (
                  <Text fw={700}>Writers</Text>
                ) : (
                  <Text fw={700}>Writer</Text>
                )}

                {writers.map((writer) => (
                  <Text key={writer.id}>{writer.name}</Text>
                ))}
              </Group>

              <Group>
                {stars.length > 1 ? (
                  <Text fw={700}>Stars</Text>
                ) : (
                  <Text fw={700}>Star</Text>
                )}

                {stars.map((star) => (
                  <Text key={star.id}>{star.name}</Text>
                ))}
              </Group>
            </Stack>
          </Stack>
        </Group>
      </Stack>

      <Outlet />
    </>
  );
}
