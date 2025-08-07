import { Box, Flex, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { MovieCard } from "../../components/MovieCard";
import { searchMoviesQueryOptions } from "../../queryOptions/search.queryOptions";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({
    query: z.string(),
  }),
  loaderDeps: ({ search: { query } }) => ({ query }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      searchMoviesQueryOptions(opts.deps.query),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: movies } = useSuspenseQuery(
    searchMoviesQueryOptions(search.query),
  );

  return (
    <Box mt={"xl"}>
      <Text size="xl" fw={600}>
        Showing results for {search.query}...
      </Text>

      <Flex wrap={"wrap"} gap={"md"} mt={"md"}>
        {movies.results
          .sort((a, b) => b.popularity - a.popularity)
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </Flex>
    </Box>
  );
}
