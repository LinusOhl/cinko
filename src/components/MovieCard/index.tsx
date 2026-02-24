import { Box, Center, Image, Text } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { IMAGES_BASE_URL } from "~/helpers";
import type { TMDBMovie } from "~/types/tmdb";

interface MovieCardProps {
  movie: TMDBMovie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      w={160}
      display={"inline-block"}
      onClick={() =>
        navigate({
          to: "/movies/$movieId/details",
          params: { movieId: movie.id },
        })
      }
    >
      {/* <div
        style={{
          backgroundImage: movie.poster_path
            ? `url(${IMAGES_BASE_URL}/w500/${movie.poster_path})`
            : "",
        }}
        className={styles.movieCardImageBox}
      > */}
      {!movie.poster_path ? (
        <Center w={160} h={240} pos={"absolute"}>
          <Text ta={"center"}>{movie.title}</Text>
        </Center>
      ) : (
        <Image src={`${IMAGES_BASE_URL}/w500/${movie.poster_path}`} />
      )}
      {/* <div className={styles.movieCardBorderBox} />
      </div> */}

      <Text c={"white"} mt={"xs"} fw={500} truncate>
        {movie.title}
      </Text>

      {movie.release_date && (
        <Text c={"cinkoGrey.3"} size="sm">
          {movie.release_date.slice(0, 4)}
        </Text>
      )}
    </Box>
  );
};
