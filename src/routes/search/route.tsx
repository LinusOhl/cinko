import { Box, Center, Flex, Pagination, Text, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { z } from "zod";
import { MovieCard } from "../../components/MovieCard";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({
    query: z.string(),
    page: z.number(),
  }),
  loaderDeps: ({ search: { query, page } }) => ({ query, page }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      searchMoviesQueryOptions(opts.deps.query, Number(opts.deps.page)),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: movies } = useSuspenseQuery(
    searchMoviesQueryOptions(search.query, Number(search.page)),
  );

  const field = useField({
    initialValue: search.query ? search.query : "",
    validate: (value) =>
      value.trim().length < 2 ? "Query is too short" : null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    navigate({ search: { query: field.getValue(), page: 1 } });
  };

  return (
    <Box mt={"xl"}>
      <form onSubmit={handleSubmit}>
        <TextInput {...field.getInputProps()} placeholder="Search..." />
      </form>

      <Text size="xl" fw={600}>
        Showing results for "{search.query}"...
      </Text>

      <Flex wrap={"wrap"} gap={"md"} mt={"md"}>
        {movies.results
          .sort((a, b) => b.popularity - a.popularity)
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </Flex>

      <Center mt={"md"}>
        <Pagination
          value={search.page}
          onChange={(value) =>
            navigate({ search: { query: search.query, page: value } })
          }
          total={movies.total_pages}
        />
      </Center>
    </Box>
  );
}
