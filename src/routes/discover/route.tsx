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
import { YearPickerInput } from "@mantine/dates";
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
    pry: z.string().optional(),
  }),
  loaderDeps: ({ search: { page, sortBy, pry } }) => ({ page, sortBy, pry }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      discoverMovieQueryOptions(
        opts.deps.page,
        opts.deps.sortBy,
        opts.deps.pry,
      ),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: movies } = useSuspenseQuery(
    discoverMovieQueryOptions(search.page, search.sortBy, search.pry),
  );

  const combobox = useCombobox();

  return (
    <Box mt={"xl"}>
      <Title order={2} c={"cinkoGrey.2"}>
        Discover movies
      </Title>

      <Flex gap={"sm"}>
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            navigate({ search: { page: search.page, sortBy: val } });
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              label="Sort by"
              component="button"
              type="button"
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
              pointer
            >
              {search.sortBy || (
                <Input.Placeholder>Pick value</Input.Placeholder>
              )}
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

        <YearPickerInput
          label="Release year"
          placeholder="Release year"
          onChange={(val) =>
            navigate({
              search: {
                page: search.page,
                sortBy: search.sortBy,
                pry: val ?? "",
              },
            })
          }
          value={search.pry ? search.pry : null}
          clearButtonProps={{
            onClick: () =>
              navigate({
                search: { page: search.page, sortBy: search.sortBy },
              }),
          }}
          clearable
        />
      </Flex>

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
