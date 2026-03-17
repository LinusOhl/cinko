import { Box, Image, Text, Tooltip } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { IMAGES_BASE_URL } from "~/helpers";
import type { TMDBMovie } from "~/types/tmdb";

interface MovieCreditProps {
  movie: TMDBMovie;
}

export const MovieCredit = ({ movie }: MovieCreditProps) => {
  const navigate = useNavigate();

  return (
    <Tooltip label={movie.title} position="bottom" withArrow>
      {movie.poster_path ? (
        <Image
          src={
            movie.poster_path
              ? `${IMAGES_BASE_URL}/w154/${movie.poster_path}`
              : null
          }
          alt={movie.title}
          w={96}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate({
              to: "/movies/$movieId/details",
              params: { movieId: movie.id.toString() },
            })
          }
        />
      ) : (
        <Box
          bg={"dark"}
          w={96}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate({
              to: "/movies/$movieId/details",
              params: { movieId: movie.id.toString() },
            })
          }
        >
          <Text ta={"center"}>{movie.title}</Text>
        </Box>
      )}
    </Tooltip>
  );
};
