import { Box, Text } from "@mantine/core";
import { IMAGES_BASE_URL } from "../../helpers";
import type { Movie } from "../../types/movies.types";
import { CustomLink } from "../CustomLink";
import styles from "./styles.module.css";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <CustomLink
      to="/movies/$movieId"
      params={{ movieId: movie.id }}
      preload={false}
    >
      <Box w={160} display={"inline-block"}>
        {/* Poster */}
        <div
          style={{
            backgroundImage: `url(${IMAGES_BASE_URL}/w500/${movie.poster_path})`,
          }}
          className={styles.movieCardImageBox}
        >
          <div className={styles.movieCardBorderBox} />
        </div>

        <Text c={"white"} mt={"xs"} fw={500} truncate>
          {movie.title}
        </Text>

        <Text c={"cinkoGrey.3"} size="sm">
          {movie.release_date.slice(0, 4)}
        </Text>
      </Box>
    </CustomLink>
  );
};
