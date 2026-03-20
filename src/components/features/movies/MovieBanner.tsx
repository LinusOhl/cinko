import { Box, Image, Overlay, Skeleton, useMantineTheme } from "@mantine/core";
import { IMAGES_BASE_URL } from "~/helpers";
import type { TMDBMovieDetails } from "~/types/tmdb";

interface MovieBannerProps {
  movie: TMDBMovieDetails;
}

export const MovieBanner = ({ movie }: MovieBannerProps) => {
  const theme = useMantineTheme();

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
        <Overlay
          bg={`
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 60%, ${theme.black} 100%), 
            linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, ${theme.black} 100%),
            linear-gradient(to left, rgba(0, 0, 0, 0) 90%, ${theme.black} 100%),
            linear-gradient(to right, rgba(0, 0, 0, 0) 90%, ${theme.black} 100%)
          `}
        />
      </Box>
    </Skeleton>
  );
};
