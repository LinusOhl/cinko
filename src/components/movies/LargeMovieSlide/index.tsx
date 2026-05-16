import { CarouselSlide } from "@mantine/carousel";
import { BackgroundImage, Box, Text } from "@mantine/core";
import { IMAGES_BASE_URL } from "~/helpers";
import type { TMDBMovie } from "~/types/tmdb";
import classes from "./LargeMovieSlide.module.css";

interface LargeMovieSlideProps {
  movie: TMDBMovie;
}

export const LargeMovieSlide = ({ movie }: LargeMovieSlideProps) => {
  return (
    <CarouselSlide key={movie.id}>
      <Box maw={960} h={560}>
        <BackgroundImage
          src={`${IMAGES_BASE_URL}/original/${movie.backdrop_path}`}
          h={560}
          radius="sm"
        >
          <Box className={classes.shadowBox} />

          <Box p="xs" className={classes.infoBox}>
            <Text fz="h2" ff="heading" fw={700}>
              {movie.title}
            </Text>

            <Text w={480} lineClamp={3}>
              {movie.overview}
            </Text>
          </Box>
        </BackgroundImage>
      </Box>
    </CarouselSlide>
  );
};
