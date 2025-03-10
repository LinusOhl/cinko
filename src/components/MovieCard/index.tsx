import { Card, Image, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movies.types";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card
      w={160}
      padding={"xs"}
      bg={"dark"}
      component={Link}
      to={`/movies/${movie.id}`}
    >
      <Card.Section>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          height={240}
          alt={movie.title}
        />
      </Card.Section>

      <Text c={"white"} truncate>
        {movie.title}
      </Text>
      <Text c={"dimmed"} size="sm">
        {movie.release_date}
      </Text>
    </Card>
  );
};
