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
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { popularMoviesQueryOptions } from "../queryOptions/movies.queryOptions";
import { MovieCard } from "./MovieCard";

export const PopularMoviesList = () => {
  const { data: popularMovies } = useSuspenseQuery(popularMoviesQueryOptions);

  return (
    <Box my={"xl"}>
      <Anchor component={Link} to="/movies/popular" c={"white"}>
        <Title order={2} mb={"xs"}>
          Popular movies
        </Title>
      </Anchor>

      <ScrollArea scrollbars="x">
        <Flex gap={"md"}>
          <ErrorBoundary
            fallback={<Alert color="red">Something went wrong!</Alert>}
          >
            <Suspense fallback={<Loader color="blue" />}>
              {popularMovies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Suspense>
          </ErrorBoundary>
        </Flex>
      </ScrollArea>
    </Box>
  );
};
