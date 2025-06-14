import { Anchor, Box, Flex, ScrollArea, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
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
          {popularMovies.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  );
};
