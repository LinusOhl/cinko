import { Card, Image, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movies.types";
import styles from "./styles.module.css";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const movieReleaseYear = movie.release_date.slice(0, 4);

  return (
    <Card
      w={160}
      padding={"none"}
      bg={"none"}
      component={Link}
      to={`/movies/${movie.id}`}
    >
      <Card.Section>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          height={240}
          alt={movie.title}
          classNames={{
            root: styles.imageRoot,
          }}
        />
      </Card.Section>

      <Text c={"white"} mt={"xs"} truncate>
        {movie.title}
      </Text>
      <Text c={"cinkoGrey.3"} size="sm">
        {movieReleaseYear}
      </Text>
    </Card>
  );
};
