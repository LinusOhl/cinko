import { Rating } from "@mantine/core";
import {
  IconMoodCrazyHappy,
  IconMoodCry,
  IconMoodHappy,
  IconMoodSad,
  IconMoodSmile,
} from "@tabler/icons-react";
import { useMovieRating } from "../../hooks/useMovieRating";
import { useRateMovie } from "../../hooks/useRateMovie";

interface MovieRatingProps {
  userId: string;
  movieId: number;
}

export const MovieRating = ({ userId, movieId }: MovieRatingProps) => {
  const rateMovieMutation = useRateMovie();
  const { data } = useMovieRating(movieId, userId);

  const getIconStyle = (color?: string) => ({
    width: 32,
    height: 32,
    color: color
      ? `var(--mantine-color-${color}-7)`
      : `var(--mantine-color-dark-2)`,
  });

  const getEmptyIcon = (value: number) => {
    const iconStyle = getIconStyle();

    switch (value) {
      case 1:
        return <IconMoodCry style={iconStyle} />;
      case 2:
        return <IconMoodSad style={iconStyle} />;
      case 3:
        return <IconMoodSmile style={iconStyle} />;
      case 4:
        return <IconMoodHappy style={iconStyle} />;
      case 5:
        return <IconMoodCrazyHappy style={iconStyle} />;
      default:
        return null;
    }
  };

  const getFullIcon = (value: number) => {
    switch (value) {
      case 1:
        return <IconMoodCry style={getIconStyle("red")} />;
      case 2:
        return <IconMoodSad style={getIconStyle("orange")} />;
      case 3:
        return <IconMoodSmile style={getIconStyle("yellow")} />;
      case 4:
        return <IconMoodHappy style={getIconStyle("lime")} />;
      case 5:
        return <IconMoodCrazyHappy style={getIconStyle("green")} />;
      default:
        return null;
    }
  };

  const handleRating = async (value: number) => {
    if (!userId) {
      console.error("Must be logged in!");
      return;
    }

    rateMovieMutation.mutate({
      value: value,
      movieId: movieId,
      userId: userId,
    });
  };

  return (
    <Rating
      value={data ? data.value : 0}
      onChange={(value) => handleRating(value)}
      emptySymbol={getEmptyIcon}
      fullSymbol={getFullIcon}
      highlightSelectedOnly
    />
  );
};
