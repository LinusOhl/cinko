import { Box } from "@mantine/core";
import { IMAGES_BASE_URL } from "~/helpers";
import classes from "./MoviePoster.module.css";

interface MoviePosterProps {
  posterPath: string;
  width: number;
}

/* TODO: set up fallback src/element */

export const MoviePoster = ({ posterPath, width }: MoviePosterProps) => {
  const getPosterSize = (width: number): string => {
    const targetWidth = width * 1.5;

    const sizes = [92, 154, 185, 342, 500, 780];

    const bestSize = sizes.find((size) => size >= targetWidth);

    return bestSize ? `w${bestSize}` : "original";
  };

  return (
    <Box w={width}>
      <div
        style={{
          backgroundImage: `url(${IMAGES_BASE_URL}/${getPosterSize(width)}/${posterPath})`,
          width: width,
        }}
        className={classes.movieCardImageBox}
      >
        <div className={classes.movieCardBorderBox} />
      </div>
    </Box>
  );
};
