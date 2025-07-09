import { Box, ScrollArea, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "../components/CustomLink";
import { MovieCard } from "../components/MovieCard";
import {
  nowPlayingMoviesQueryOptions,
  popularMoviesQueryOptions,
  topRatedMoviesQueryOptions,
} from "../queryOptions/movies.queryOptions";

export const Route = createFileRoute("/")({
  loader: (opts) =>
    Promise.all([
      opts.context.queryClient.ensureQueryData(nowPlayingMoviesQueryOptions()),
      opts.context.queryClient.ensureQueryData(popularMoviesQueryOptions()),
      opts.context.queryClient.ensureQueryData(topRatedMoviesQueryOptions()),
    ]),
  component: IndexView,
  errorComponent: () => <div>Something went wrooooong!!</div>,
});

function IndexView() {
  const { data: popularMovies } = useSuspenseQuery(popularMoviesQueryOptions());
  const { data: topRatedMovies } = useSuspenseQuery(
    topRatedMoviesQueryOptions(),
  );
  const { data: nowPlayingMovies } = useSuspenseQuery(
    nowPlayingMoviesQueryOptions(),
  );

  return (
    <div>
      <Box my={"xl"}>
        <CustomLink to="/" c={"white"} preload={false}>
          <Title order={2} mb={"xs"}>
            Popular movies
          </Title>
        </CustomLink>

        <ScrollArea type="always" scrollbars="x" offsetScrollbars>
          <Box display={"inline-flex"} style={{ gap: 16 }}>
            {popularMovies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        </ScrollArea>
      </Box>

      <Box my={"xl"}>
        <CustomLink to="/" c={"white"} preload={false}>
          <Title order={2} mb={"xs"}>
            Top rated movies
          </Title>
        </CustomLink>

        <ScrollArea type="always" scrollbars="x" offsetScrollbars>
          <Box display={"inline-flex"} style={{ gap: 16 }}>
            {topRatedMovies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        </ScrollArea>
      </Box>

      <Box my={"xl"}>
        <CustomLink to="/" c={"white"} preload={false}>
          <Title order={2} mb={"xs"}>
            Now playing movies
          </Title>
        </CustomLink>

        <ScrollArea type="always" scrollbars="x" offsetScrollbars>
          <Box display={"inline-flex"} style={{ gap: 16 }}>
            {nowPlayingMovies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        </ScrollArea>
      </Box>
    </div>
  );
}
