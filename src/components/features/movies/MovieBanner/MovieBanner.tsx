import { Box, Image, Overlay, Skeleton } from "@mantine/core";
import { IMAGES_BASE_URL } from "~/helpers";
import type { TMDBMovieDetails } from "~/types/tmdb";
import classes from "./MovieBanner.module.css";

interface MovieBannerProps {
  movie: TMDBMovieDetails;
}

export const MovieBanner = ({ movie }: MovieBannerProps) => {
  return (
    <Skeleton h={522} visible={!movie}>
      <Box pos={"relative"}>
        <Image
          src={`${IMAGES_BASE_URL}/w1280/${movie.backdrop_path}`}
          fallbackSrc="https://placehold.co/1280x720"
          alt={movie.title || "Movie backdrop"}
          radius={"md"}
        />

        {/* Fade-effect of backdrop image */}
        <Overlay classNames={{ root: classes.root }} />
      </Box>
    </Skeleton>
  );
};
