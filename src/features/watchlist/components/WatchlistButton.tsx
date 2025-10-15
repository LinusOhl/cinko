import { Button } from "@mantine/core";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";
import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useRemoveFromWatchlist } from "../hooks/useRemoveFromWatchlist";
import { useWatchlistItem } from "../hooks/useWatchlistItem";

interface WatchlistButtonProps {
  userId: string;
}

export const WatchlistButton = ({ userId }: WatchlistButtonProps) => {
  const { movieId } = useParams({ from: "/movies/$movieId" });

  const { data } = useWatchlistItem(movieId, userId);
  const addToWatchlistMutation = useAddToWatchlist();
  const removeFromWatchlistMutation = useRemoveFromWatchlist();

  return (
    <>
      {data ? (
        <Button
          color="cinkoBlue"
          leftSection={<IconCheck size={18} color="#e5dada" stroke={3} />}
          radius={"md"}
          mt={"xs"}
          onClick={() =>
            removeFromWatchlistMutation.mutate({
              itemId: data.id,
              movieId,
              userId,
            })
          }
          fullWidth
        >
          Added to watchlist
        </Button>
      ) : (
        <Button
          color="cinkoBlue"
          leftSection={<IconPlus size={18} color="#e5dada" stroke={3} />}
          radius={"md"}
          mt={"xs"}
          onClick={() => addToWatchlistMutation.mutate({ movieId, userId })}
          fullWidth
        >
          Add to watchlist
        </Button>
      )}
    </>
  );
};
