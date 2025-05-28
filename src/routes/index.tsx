import {
  Alert,
  Anchor,
  Box,
  Flex,
  Loader,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MovieCard } from "../components/MovieCard";
import { PopularMoviesList } from "../components/PopularMoviesList";
import {
  nowPlayingMoviesQueryOptions,
  popularMoviesQueryOptions,
  topRatedMoviesQueryOptions,
} from "../queryOptions/movies.queryOptions";

export const Route = createFileRoute("/")({
  // loader:
  //   ({ context: { queryClient } }) =>
  //   // Promise.all([
  //   //   queryClient.ensureQueryData(popularMoviesQueryOptions),
  //   //   queryClient.ensureQueryData(topRatedMoviesQueryOptions),
  //   //   queryClient.ensureQueryData(nowPlayingMoviesQueryOptions),
  //   // ]),
  //   () =>
  //     useQueries({
  //       queries: [
  //         popularMoviesQueryOptions,
  //         topRatedMoviesQueryOptions,
  //         nowPlayingMoviesQueryOptions,
  //       ],
  //     }),
  component: IndexView,
  errorComponent: () => <div>Something went wrooooong!!</div>,
});

function IndexView() {
  // const { data: popularMovies } = useSuspenseQuery(popularMoviesQueryOptions);
  const { data: topRatedMovies } = useSuspenseQuery(topRatedMoviesQueryOptions);
  const { data: nowPlayingMovies } = useSuspenseQuery(
    nowPlayingMoviesQueryOptions,
  );

  return (
    <div>
      <PopularMoviesList />

      <Box my={"xl"}>
        <Anchor component={Link} to="/movies/top_rated" c={"white"}>
          <Title order={2} mb={"xs"}>
            Top rated movies
          </Title>
        </Anchor>

        <ScrollArea scrollbars="x">
          <Flex gap={"md"}>
            {topRatedMovies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Flex>
        </ScrollArea>
      </Box>

      <Box my={"xl"}>
        <Anchor component={Link} to="/movies/now_playing" c={"white"}>
          <Title order={2} mb={"xs"}>
            Now playing movies
          </Title>
        </Anchor>

        <ScrollArea scrollbars="x">
          <Flex gap={"md"}>
            {nowPlayingMovies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Flex>
        </ScrollArea>
      </Box>
    </div>
  );
}
