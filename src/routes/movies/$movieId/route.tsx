import { Badge, Group, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";
import { MovieBanner } from "~/components/movies/MovieBanner";
import { MoviePoster } from "~/components/movies/MoviePoster";
import { MovieRatings } from "~/components/ratings/MovieRatings";
import { RateMovie } from "~/components/ratings/RateMovie";
import { AddToWatchlistButton } from "~/components/watchlist/AddToWatchlistButton";
import { RemoveFromWatchlistButton } from "~/components/watchlist/RemoveFromWatchlistButton";
import { watchlistItemQueryOptions } from "~/server/db/watchlist/watchlist.queries";
import { movieQueryOptions } from "~/server/tmdb/movies/movies.queries";

export const Route = createFileRoute("/movies/$movieId")({
  params: {
    parse: (params) => ({
      movieId: z.string().parse(params.movieId),
    }),
  },
  loader: async ({ params: { movieId }, context: { queryClient } }) => {
    await queryClient.ensureQueryData(
      movieQueryOptions(movieId, ["credits", "images"]),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();

  const { data: movie } = useSuspenseQuery(
    movieQueryOptions(movieId, ["credits", "images"]),
  );
  const { data: watchlistItem } = useSuspenseQuery(
    watchlistItemQueryOptions(Number(movieId)),
  );

  const movieReleaseYear = movie.release_date.slice(0, 4);
  const stars = movie.credits?.cast.slice(0, 3);
  const directors = movie.credits?.crew.filter((k) => k.job === "Director");
  const writers = movie.credits?.crew.filter(
    (k) => k.job === "Writer" || k.job === "Screenplay",
  );

  return (
    <>
      <Stack mb="xl">
        <MovieBanner movie={movie} />

        <Group align="flex-start" wrap="nowrap" mt="xl">
          <Stack>
            <MoviePoster posterPath={movie.poster_path} width={250} />

            <MovieRatings movieId={Number(movieId)} />

            <Stack gap="sm">
              <RateMovie movie={movie} />

              {watchlistItem ? (
                <RemoveFromWatchlistButton movieId={Number(movieId)} />
              ) : (
                <AddToWatchlistButton movie={movie} />
              )}
            </Stack>
          </Stack>

          <Stack gap="lg">
            <Stack gap={0}>
              <Title order={1} c="white" style={{ textWrap: "balance" }}>
                {movie.title}
              </Title>

              <Group gap="xs">
                <Text size="sm">{movieReleaseYear}</Text>

                <IconCircleFilled size={6} />

                <Text size="sm">{movie.runtime}min</Text>

                <IconCircleFilled size={6} />

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
            </Stack>

            <Text fs="italic">{movie.tagline}</Text>

            <Text>{movie.overview}</Text>

            <Stack gap="xs">
              <Group>
                {directors && directors.length > 1 ? (
                  <Text fw={700}>Directors</Text>
                ) : (
                  <Text fw={700}>Director</Text>
                )}

                {directors?.map((director) => (
                  <Text key={director.id}>{director.name}</Text>
                ))}
              </Group>

              <Group>
                {writers && writers.length > 1 ? (
                  <Text fw={700}>Writers</Text>
                ) : (
                  <Text fw={700}>Writer</Text>
                )}

                {writers?.map((writer) => (
                  <Text key={writer.id}>{writer.name}</Text>
                ))}
              </Group>

              <Group>
                {stars && stars.length > 1 ? (
                  <Text fw={700}>Stars</Text>
                ) : (
                  <Text fw={700}>Star</Text>
                )}

                {stars?.map((star) => (
                  <Text key={star.id}>{star.name}</Text>
                ))}
              </Group>
            </Stack>

            {/* TODO: move code below to a proper/better place! */}
            {/* <Stack>
              <Title order={2}>Images</Title>

              <SimpleGrid cols={3}>
                {movie.images?.backdrops.slice(0, 6).map((image) => (
                  <Image
                    key={image.file_path}
                    src={`${IMAGES_BASE_URL}/w300/${image.file_path}`}
                    radius="sm"
                    loading="lazy"
                    styles={{ root: { aspectRatio: image.aspect_ratio } }}
                  />
                ))}
              </SimpleGrid>
            </Stack> */}
          </Stack>
        </Group>
      </Stack>

      <Outlet />
    </>
  );
}
