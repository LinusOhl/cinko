import {
  Anchor,
  Box,
  Card,
  Flex,
  Image,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { MovieCard } from "../components/MovieCard";
import {
  nowPlayingMoviesQueryOptions,
  popularMoviesQueryOptions,
  topRatedMoviesQueryOptions,
} from "../queries/movies.queries";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(popularMoviesQueryOptions),
      queryClient.ensureQueryData(topRatedMoviesQueryOptions),
      queryClient.ensureQueryData(nowPlayingMoviesQueryOptions),
    ]),
  component: IndexView,
});

function IndexView() {
  const { data: popularMovies } = useSuspenseQuery(popularMoviesQueryOptions);
  const { data: topRatedMovies } = useSuspenseQuery(topRatedMoviesQueryOptions);
  const { data: nowPlayingMovies } = useSuspenseQuery(
    nowPlayingMoviesQueryOptions,
  );

  return (
    <div>
      <Box my={"lg"}>
        <Anchor component={Link} to="/movies/popular" c={"white"}>
          <Title order={2} mb={"xs"}>
            Popular movies
          </Title>
        </Anchor>

        <ScrollArea scrollbars="x">
          <Flex gap={"md"}>
            {popularMovies?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Flex>
        </ScrollArea>
      </Box>

      <Box my={"lg"}>
        <Anchor component={Link} to="/movies/top_rated" c={"white"}>
          <Title order={2} mb={"xs"}>
            Top rated movies
          </Title>
        </Anchor>

        <ScrollArea scrollbars="x">
          <Flex gap={"md"}>
            {topRatedMovies?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Flex>
        </ScrollArea>
      </Box>

      <Box my={"lg"}>
        <Anchor component={Link} to="/movies/now_playing" c={"white"}>
          <Title order={2} mb={"xs"}>
            Now playing movies
          </Title>
        </Anchor>

        <ScrollArea scrollbars="x">
          <Flex gap={"md"}>
            {nowPlayingMovies?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Flex>
        </ScrollArea>
      </Box>
    </div>
  );
}
