import {
  Box,
  Center,
  Combobox,
  Flex,
  Input,
  InputBase,
  Pagination,
  Title,
  useCombobox,
} from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { MovieCard } from "../../components/MovieCard";
import { SortBy } from "../../constants/filters";
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
  const navigate = Route.useNavigate();
  const { data: movies } = useSuspenseQuery(
    discoverMovieQueryOptions(search.page, search.sortBy),
  );

  const combobox = useCombobox();

  return (
    <Box mt={"xl"}>
      <Title order={2} c={"cinkoGrey.2"}>
        Discover movies
      </Title>

      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          navigate({ search: { page: search.page, sortBy: val } });
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
            pointer
          >
            {search.sortBy || <Input.Placeholder>Pick value</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {Object.values(SortBy).map((value) => (
              <Combobox.Option key={value} value={value}>
                {value}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Flex wrap={"wrap"} gap={"md"} mt={"md"}>
        {movies.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Flex>

      <Center mt={"md"}>
        <Pagination
          value={search.page}
          onChange={(value) =>
            navigate({ search: { page: value, sortBy: search.sortBy } })
          }
          total={movies.total_pages}
        />
      </Center>
    </Box>
  );
}
