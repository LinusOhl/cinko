import { Loader, Rating } from "@mantine/core";
import { useMovieRating } from "../../hooks/useMovieRating";
import { useRateMovie } from "../../hooks/useRateMovie";
import { getEmptyIcon, getFullIcon } from "./helpers";

interface MovieRatingProps {
  userId: string;
  movieId: number;
}

export const MovieRating = ({ userId, movieId }: MovieRatingProps) => {
  const { data } = useMovieRating(movieId, userId);
  const rateMovieMutation = useRateMovie();

  if (rateMovieMutation.isPending) {
    return (
      <div>
        <Loader color="dark.4" />
      </div>
    );
  }

  return (
    <Rating
      value={data ? data.value : 0}
      onChange={(value) =>
        rateMovieMutation.mutate({
          value: value,
          movieId: movieId,
          userId: userId,
        })
      }
      emptySymbol={getEmptyIcon}
      fullSymbol={getFullIcon}
      highlightSelectedOnly
    />
  );
};
