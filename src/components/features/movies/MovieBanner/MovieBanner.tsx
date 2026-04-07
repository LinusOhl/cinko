import { Box, Image, Overlay } from "@mantine/core";
import { IMAGES_BASE_URL } from "~/helpers";
import type { TMDBMovieDetails } from "~/types/tmdb";
import classes from "./MovieBanner.module.css";

interface MovieBannerProps {
  movie: TMDBMovieDetails;
}

export const MovieBanner = ({ movie }: MovieBannerProps) => {
  return (
    <Box className={classes.boxRoot}>
      <Image
        src={`${IMAGES_BASE_URL}/w1280/${movie.backdrop_path}`}
        fallbackSrc="https://placehold.co/1280x720"
        alt={movie.title || "Movie backdrop"}
        radius={"md"}
        loading="lazy"
        classNames={{ root: classes.imageRoot }}
      />

      {/* Fade-effect of backdrop image */}
      <Overlay classNames={{ root: classes.overlayRoot }} />
    </Box>
  );
};
