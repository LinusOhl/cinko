import { Box, Image, Text, Tooltip } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { IMAGES_BASE_URL } from "~/helpers";

interface MovieCreditProps {
  id: number;
  posterPath: string | null;
  title: string;
  work: string;
}

export const MovieCredit = ({
  id,
  posterPath,
  title,
  work,
}: MovieCreditProps) => {
  const navigate = useNavigate();

  return (
    <Tooltip label={`${title} as ${work}`} position="bottom" withArrow>
      {posterPath ? (
        <Image
          src={posterPath ? `${IMAGES_BASE_URL}/w154/${posterPath}` : null}
          alt={title}
          w={96}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate({
              to: "/movies/$movieId/details",
              params: { movieId: id.toString() },
            })
          }
        />
      ) : (
        <Box
          bg={"dark"}
          w={96}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate({
              to: "/movies/$movieId/details",
              params: { movieId: id.toString() },
            })
          }
        >
          <Text ta={"center"}>{title}</Text>
        </Box>
      )}
    </Tooltip>
  );
};
