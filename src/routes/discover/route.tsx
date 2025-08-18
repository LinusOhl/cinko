import { Box, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { discoverMovieQueryOptions } from "../../queryOptions/discover.queryOptions";

export const Route = createFileRoute("/discover")({
  validateSearch: z.object({
    page: z.number(),
    sortBy: z.string(),
  }),
  loaderDeps: ({ search: { page, sortBy } }) => ({ page, sortBy }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      discoverMovieQueryOptions(opts.deps.page, opts.deps.sortBy),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: movies } = useSuspenseQuery(
    discoverMovieQueryOptions(search.page, search.sortBy),
  );

  console.log("movies:", movies);

  return (
    <Box mt={"xl"}>
      <Title order={2} c={"cinkoGrey.2"}>
        Discover movies
      </Title>
    </Box>
  );
}
