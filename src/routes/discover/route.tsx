import {
  Box,
  Center,
  Combobox,
  ComboboxChevron,
  ComboboxDropdown,
  ComboboxOption,
  ComboboxOptions,
  ComboboxTarget,
  Flex,
  // Input,
  InputBase,
  InputPlaceholder,
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
import { discoverMovieQueryOptions } from "../../queries/discover";

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
          <ComboboxTarget>
            <InputBase
              label="Sort by"
              component="button"
              type="button"
              rightSection={<ComboboxChevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
              pointer
            >
              {search.sortBy || <InputPlaceholder>Pick value</InputPlaceholder>}
            </InputBase>
          </ComboboxTarget>

          <ComboboxDropdown>
            <ComboboxOptions>
              {Object.values(SortBy).map((value) => (
                <ComboboxOption key={value} value={value}>
                  {value}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </ComboboxDropdown>
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
