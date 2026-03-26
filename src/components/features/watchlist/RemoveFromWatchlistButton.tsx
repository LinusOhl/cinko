import { Button } from "@mantine/core";
import { useRemoveFromWatchlistMutation } from "~/server/db/watchlist/watchlist.queries";

interface RemoveFromWatchlistButtonProps {
  movieId: number;
}

export const RemoveFromWatchlistButton = ({
  movieId,
}: RemoveFromWatchlistButtonProps) => {
  const { mutate, isPending } = useRemoveFromWatchlistMutation();

  return (
    <Button
      color="cinkoBlue.6"
      loading={isPending}
      onClick={() =>
        mutate({
          data: movieId,
        })
      }
      fullWidth
    >
      Remove from Watchlist
    </Button>
  );
};
