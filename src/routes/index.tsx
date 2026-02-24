import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "~/components/CustomLink";
import { MovieCard } from "~/components/MovieCard";
import {
  playingMoviesQueryOptions,
  popularMoviesQueryOptions,
  topMoviesQueryOptions,
} from "~/queries/movies";

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(playingMoviesQueryOptions()),
      context.queryClient.ensureQueryData(popularMoviesQueryOptions()),
      context.queryClient.ensureQueryData(topMoviesQueryOptions()),
    ]),
  component: IndexView,
});

function IndexView() {
  const { data: popularMovies } = useSuspenseQuery(popularMoviesQueryOptions());
  const { data: topRatedMovies } = useSuspenseQuery(topMoviesQueryOptions());
  const { data: nowPlayingMovies } = useSuspenseQuery(
    playingMoviesQueryOptions(),
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
