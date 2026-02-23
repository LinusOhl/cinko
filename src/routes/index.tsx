import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "../components/CustomLink";
import { MovieCard } from "../components/MovieCard";
import {
  nowPlayingMoviesQueryOptions,
  popularMoviesQueryOptions,
  topRatedMoviesQueryOptions,
} from "../queries/movies.queryOptions";

export const Route = createFileRoute("/")({
  loader: (opts) =>
    Promise.all([
      opts.context.queryClient.ensureQueryData(nowPlayingMoviesQueryOptions()),
      opts.context.queryClient.ensureQueryData(popularMoviesQueryOptions()),
      opts.context.queryClient.ensureQueryData(topRatedMoviesQueryOptions()),
    ]),
  errorComponent: () => <div>Something went wrooooong!!</div>,
  component: IndexView,
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

        <Carousel
          slideGap={"md"}
          slideSize={"10%"}
          emblaOptions={{ dragFree: true }}
        >
          {popularMovies.results.map((movie) => (
            <CarouselSlide key={movie.id}>
              <MovieCard movie={movie} />
            </CarouselSlide>
          ))}
        </Carousel>
      </Box>

      <Box my={"xl"}>
        <CustomLink to="/" c={"white"} preload={false}>
          <Title order={2} mb={"xs"}>
            Top rated movies
          </Title>
        </CustomLink>

        <Carousel
          slideGap={"md"}
          slideSize={"10%"}
          emblaOptions={{ dragFree: true }}
        >
          {topRatedMovies.results.map((movie) => (
            <CarouselSlide key={movie.id}>
              <MovieCard movie={movie} />
            </CarouselSlide>
          ))}
        </Carousel>
      </Box>

      <Box my={"xl"}>
        <CustomLink to="/" c={"white"} preload={false}>
          <Title order={2} mb={"xs"}>
            Now playing movies
          </Title>
        </CustomLink>

        <Carousel
          slideGap={"md"}
          slideSize={"10%"}
          emblaOptions={{ dragFree: true }}
        >
          {nowPlayingMovies.results.map((movie) => (
            <CarouselSlide key={movie.id}>
              <MovieCard movie={movie} />
            </CarouselSlide>
          ))}
        </Carousel>
      </Box>
    </div>
  );
}
