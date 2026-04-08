import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Stack, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "~/components/CustomLink";
import { LargeMovieSlide } from "~/components/features/movies/LargeMovieSlide";
import { MovieCard } from "~/components/features/movies/MovieCard";
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
  const { data: topMovies } = useSuspenseQuery(topMoviesQueryOptions());
  const { data: playingMovies } = useSuspenseQuery(playingMoviesQueryOptions());

  return (
    <Stack gap={"xl"} my={"xl"}>
      <Box>
        <Carousel
          height={560}
          slideGap={"md"}
          slideSize={"100%"}
          emblaOptions={{ loop: true, dragFree: false, align: "center" }}
        >
          {playingMovies.results
            .filter((movie) => !!movie.backdrop_path)
            .map((movie) => (
              <LargeMovieSlide key={movie.id} movie={movie} />
            ))}
        </Carousel>
      </Box>

      <Box>
        <CustomLink to="/" c={"white"} preload={false}>
          <Title order={2} mb={"xs"} display={"inline"}>
            Top rated movies
          </Title>
        </CustomLink>

        <Carousel
          slideGap={"md"}
          slideSize={"10%"}
          emblaOptions={{ dragFree: true }}
        >
          {topMovies.results.map((movie) => (
            <CarouselSlide key={movie.id}>
              <MovieCard movie={movie} />
            </CarouselSlide>
          ))}
        </Carousel>
      </Box>

      <Box>
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
    </Stack>
  );
}
