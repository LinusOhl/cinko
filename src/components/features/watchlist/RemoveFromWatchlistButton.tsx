import { Button } from "@mantine/core";
import { useRemoveFromWatchlistMutation } from "~/server/db/watchlist/watchlist.queries";

interface RemoveFromWatchlistButtonProps {
  movieId: number;
}

export const RemoveFromWatchlistButton = ({
  movieId,
}: RemoveFromWatchlistButtonProps) => {
  const removeFromWatchlistMutation = useRemoveFromWatchlistMutation();

  return (
    <Button
      color="cinkoBlue.6"
      onClick={() =>
        removeFromWatchlistMutation.mutate({
          data: { movieId },
        })
      }
    >
      Remove from Watchlist
    </Button>
  );
};
