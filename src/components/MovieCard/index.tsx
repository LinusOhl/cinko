import { Box, Center, Text } from "@mantine/core";
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
      to="/movies/$movieId/details"
      params={{ movieId: movie.id }}
      from="/"
      preload={false}
    >
      <Box w={160} display={"inline-block"}>
        {/* Poster */}
        <div
          style={{
            backgroundImage: movie.poster_path
              ? `url(${IMAGES_BASE_URL}/w500/${movie.poster_path})`
              : "",
          }}
          className={styles.movieCardImageBox}
        >
          {!movie.poster_path && (
            <Center w={160} h={240} pos={"absolute"}>
              <Text ta={"center"}>{movie.title}</Text>
            </Center>
          )}
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
