import { Carousel, CarouselSlide } from "@mantine/carousel";
import {
  BackgroundImage,
  Box,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "~/components/CustomLink";
import { MovieCard } from "~/components/MovieCard";
import { IMAGES_BASE_URL } from "~/helpers";
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
  const theme = useMantineTheme();

  const { data: popularMovies } = useSuspenseQuery(popularMoviesQueryOptions());
  const { data: topMovies } = useSuspenseQuery(topMoviesQueryOptions());
  const { data: playingMovies } = useSuspenseQuery(playingMoviesQueryOptions());

  return (
    <Stack gap={"xl"}>
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
              <CarouselSlide key={movie.id}>
                <Box maw={960} h={560}>
                  <BackgroundImage
                    src={`${IMAGES_BASE_URL}/original/${movie.backdrop_path}`}
                    h={560}
                  >
                    <Box
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `linear-gradient(to top, ${theme.colors.dark[7]} 5%, transparent 40%)`,
                      }}
                    />

                    <Box p={"xs"} style={{ position: "absolute", bottom: 0 }}>
                      <Text fz={"h2"} ff={"heading"} fw={700}>
                        {movie.title}
                      </Text>

                      <Text w={480} lineClamp={3}>
                        {movie.overview}
                      </Text>
                    </Box>
                  </BackgroundImage>
                </Box>
              </CarouselSlide>
            ))}
        </Carousel>
      </Box>

      <Box>
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
