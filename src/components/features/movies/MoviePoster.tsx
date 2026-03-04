import { Box } from "@mantine/core";
import { IMAGES_BASE_URL } from "~/helpers";

interface MoviePosterProps {
  posterPath: string;
  width: number;
}

/* TODO: set up fallback src/element */

export const MoviePoster = ({ posterPath, width }: MoviePosterProps) => {
  return (
    <Box w={width}>
      <div
        style={{
          backgroundImage: `url(${IMAGES_BASE_URL}/w500/${posterPath})`,
          width: width,
        }}
        className={"movieCardImageBox"}
      >
        <div className={"movieCardBorderBox"} />
      </div>
    </Box>
  );
};
