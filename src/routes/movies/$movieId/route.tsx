import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Overlay,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCircleFilled, IconPlus } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CustomLink } from "../../../components/CustomLink";
import { MovieRating } from "../../../components/MovieRating/MovieRating";
import { IMAGES_BASE_URL } from "../../../helpers";
import { movieQueryOptions } from "../../../queryOptions/movies.queryOptions";

export const Route = createFileRoute("/movies/$movieId")({
  params: {
    parse: (params) => ({
      movieId: z.number().int().parse(Number(params.movieId)),
    }),
  },
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      movieQueryOptions(opts.params.movieId),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(params.movieId));

  const movieReleaseYear = movie.release_date.slice(0, 4);
  const directors = movie.credits?.crew?.filter(
    (person) => person.job === "Director",
  );

  const movieLogo = movie.images?.logos.find((logo) => logo.iso_639_1 === "en");

  return (
    <Box mt={"xl"}>
      {/* Backdrop image */}
      <Skeleton h={522} visible={!movie}>
        <Box pos={"relative"}>
          <Image
            src={`${IMAGES_BASE_URL}/w1280/${movie.backdrop_path}`}
            fallbackSrc="https://placehold.co/1280x720"
            alt={movie.title || "Movie backdrop"}
            radius={"md"}
          />

          {/* Fade-effect of backdrop image */}
          <Overlay
            bg={`
              radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 60%, #02040f 100%), 
              linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, #02040f 100%),
              linear-gradient(to left, rgba(0, 0, 0, 0) 90%, #02040f 100%),
              linear-gradient(to right, rgba(0, 0, 0, 0) 90%, #02040f 100%)
            `}
          />

          {/* Movie logo */}
          <div className="movie-logo-wrapper">
            {movieLogo?.file_path && (
              <Image
                src={`${IMAGES_BASE_URL}/w300/${movieLogo?.file_path}`}
                maw={"100%"}
                mah={"100%"}
                fit="contain"
              />
            )}
          </div>
        </Box>
      </Skeleton>

      {/* Content */}
      <Grid mt={"xs"}>
        {/* Left section */}
        <Grid.Col span={3}>
          {/* Poster */}
          {/* TODO: set up fallback src/element */}
          <Skeleton h={375} visible={!movie}>
            <Box w={"100%"}>
              {/* Poster */}
              <div
                style={{
                  backgroundImage: `url(${IMAGES_BASE_URL}/w500/${movie.poster_path})`,
                }}
                className={"movieCardImageBox"}
              >
                <div className={"movieCardBorderBox"} />
              </div>
            </Box>
          </Skeleton>

          {/* User actions */}
          {/* TODO: Rating system */}
          <Paper radius={"md"} p={"xs"} mt={"sm"}>
            <Center>
              <MovieRating
                userRating={Math.floor(Math.random() * (5 - 0 + 1)) + 0}
              />
            </Center>

            {/* TODO: Add to watchlist */}
            <Button
              color="cinkoBlue"
              leftSection={<IconPlus size={18} color="#e5dada" stroke={3} />}
              radius={"md"}
              mt={"xs"}
              fullWidth
            >
              Add to watchlist
            </Button>
          </Paper>
        </Grid.Col>

        {/* Right section */}
        <Grid.Col span={9}>
          {/* Title and director */}
          <Flex align={"baseline"} justify={"space-between"}>
            <Title order={1} style={{ textWrap: "balance" }}>
              {movie.title}
            </Title>

            <Group align="baseline" gap={"xs"}>
              <Text c={"cinkoGrey.3"}>directed by</Text>

              <Stack gap={"xs"}>
                {directors?.map((director) => (
                  <CustomLink
                    key={director.id}
                    underline="hover"
                    c={"white"}
                    fw={500}
                    to="/people/$personId"
                    params={{ personId: Number(director.id) }}
                    from="/"
                    preload={false}
                  >
                    {director.name}
                  </CustomLink>
                ))}
              </Stack>
            </Group>
          </Flex>

          {/* Quick facts */}
          <Group gap={"xs"} mt={"xs"}>
            {/* Release year */}
            <Text size="sm" c={"cinkoGrey.3"}>
              {movieReleaseYear}
            </Text>

            <IconCircleFilled size={6} color="#bba6a6" />

            {/* Runtime */}
            <Text size="sm" c={"cinkoGrey.3"}>
              {movie.runtime}min
            </Text>

            <IconCircleFilled size={6} color="#bba6a6" />

            {/* Genres */}
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

          <Outlet />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
