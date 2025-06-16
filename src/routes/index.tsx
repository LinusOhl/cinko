import { Anchor, Box, ScrollArea, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { MovieCard } from "../components/MovieCard";
import {
  nowPlayingMoviesQueryOptions,
  popularMoviesQueryOptions,
  topRatedMoviesQueryOptions,
} from "../queryOptions/movies.queryOptions";

export const Route = createFileRoute("/")({
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
        <Anchor component={Link} to="/movies/popular" c={"white"}>
          <Title order={2} mb={"xs"}>
            Popular movies
          </Title>
        </Anchor>

        <ScrollArea type="always" scrollbars="x" offsetScrollbars>
          <Box display={"inline-flex"} style={{ gap: 16 }}>
            {popularMovies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        </ScrollArea>
      </Box>

      <Box my={"xl"}>
        <Anchor component={Link} to="/movies/top_rated" c={"white"}>
          <Title order={2} mb={"xs"}>
            Top rated movies
          </Title>
        </Anchor>

        <ScrollArea type="always" scrollbars="x" offsetScrollbars>
          <Box display={"inline-flex"} style={{ gap: 16 }}>
            {topRatedMovies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        </ScrollArea>
      </Box>

      <Box my={"xl"}>
        <Anchor component={Link} to="/movies/now_playing" c={"white"}>
          <Title order={2} mb={"xs"}>
            Now playing movies
          </Title>
        </Anchor>

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
