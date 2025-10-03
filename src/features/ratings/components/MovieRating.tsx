import { Loader, Rating } from "@mantine/core";
import { useParams } from "@tanstack/react-router";
import { useMovieRating } from "../hooks/useMovieRating";
import { useRateMovie } from "../hooks/useRateMovie";
import { getEmptyIcon, getFullIcon } from "../utils/ratingHelpers";

interface MovieRatingProps {
  userId: string;
}

export const MovieRating = ({ userId }: MovieRatingProps) => {
  const { movieId } = useParams({ from: "/movies/$movieId" });

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
