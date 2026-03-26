import { Button } from "@mantine/core";
import { useAddToWatchlistMutation } from "~/server/db/watchlist/watchlist.queries";
import type { TMDBMovie, TMDBMovieDetails } from "~/types/tmdb";

interface AddToWatchlistButtonProps {
  movie: TMDBMovie | TMDBMovieDetails;
}

export const AddToWatchlistButton = ({ movie }: AddToWatchlistButtonProps) => {
  const { mutate, isPending } = useAddToWatchlistMutation();

  return (
    <Button
      color="cinkoBlue.6"
      loading={isPending}
      onClick={() => mutate({ data: movie })}
      fullWidth
    >
      Add to Watchlist
    </Button>
  );
};
