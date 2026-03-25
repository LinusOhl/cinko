import { Button } from "@mantine/core";
import { useAddToWatchlistMutation } from "~/server/db/watchlist/watchlist.queries";
import type { TMDBMovie, TMDBMovieDetails } from "~/types/tmdb";

interface AddToWatchlistButtonProps {
  movie: TMDBMovie | TMDBMovieDetails;
}

export const AddToWatchlistButton = ({ movie }: AddToWatchlistButtonProps) => {
  const addToWatchlistMutation = useAddToWatchlistMutation();

  return (
    <Button
      color="cinkoBlue.6"
      onClick={() => addToWatchlistMutation.mutate({ data: movie })}
    >
      Add to Watchlist
    </Button>
  );
};
