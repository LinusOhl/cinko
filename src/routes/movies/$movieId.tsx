import {
  Box,
  Flex,
  Group,
  Image,
  NumberFormatter,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CustomLink } from "../../components/CustomLink";
import { movieQueryOptions } from "../../queryOptions/movies.queryOptions";

export const Route = createFileRoute("/movies/$movieId")({
  params: {
    parse: (params) => ({
      movieId: z.number().int().parse(Number(params.movieId)),
    }),
  },
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      movieQueryOptions(opts.params.movieId),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: possible to use Mantine CSS variable instead?
  const isMobile = useMediaQuery("(max-width: 36em)");

  const params = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(params.movieId));

  const movieReleaseYear = movie.release_date.slice(0, 4);
  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director",
  );

  return (
    <Box mt={"xl"}>
      {/* Backdrop image */}
      <Image
        src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
        fallbackSrc="https://placehold.co/1280x720"
        alt={movie.title || "Movie backdrop"}
        style={{
          width: isMobile ? "100vw" : "",
          marginLeft: isMobile ? "calc(-50vw + 50%)" : "",
        }}
        radius={"md"}
      />

      {/* Content */}
      <Flex mt={isMobile ? "xs" : "lg"} gap={"md"}>
        {/* Poster image, rendered if NOT on mobile */}
        {!isMobile && (
          <Image
            src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            alt={movie.title || "Movie poster"}
            w={"180"}
            h={"260"}
            radius={"md"}
          />
        )}

        <Box>
          {/* Title and director */}
          <Flex align={"baseline"} justify={"space-between"}>
            <Title order={1} size={"h2"}>
              {movie.title}
            </Title>

            <Text c={"gray.5"}>
              directed by{" "}
              <CustomLink
                underline="hover"
                c={"white"}
                to={"/people/$personId"}
                params={{
                  personId: Number(director?.id),
                }}
                preloadDelay={2000}
              >
                {director?.name}
              </CustomLink>
            </Text>
          </Flex>

          {/* Release date */}
          <Text size="sm" c={"gray.5"}>
            {movieReleaseYear}
          </Text>

          <Text mt={"md"} fs={"italic"} c={"gray"}>
            {movie.tagline}
          </Text>

          {/* Overview */}
          <Text mt={"md"} c={"gray.5"}>
            {movie.overview}
          </Text>

          {/* Quick facts */}
          <Group mt={"md"}>
            <Paper shadow="sm" p={"sm"} bg={"dark.8"}>
              <Flex direction={"column"} align={"center"}>
                <Text size="sm" fw={500}>
                  Runtime
                </Text>
                <Text size="lg">{movie.runtime}min</Text>
              </Flex>
            </Paper>
            <Paper shadow="sm" p={"sm"} bg={"dark.8"}>
              <Flex direction={"column"} align={"center"}>
                <Text size="sm" fw={500}>
                  Budget
                </Text>
                <Text size="lg">
                  <NumberFormatter
                    prefix="$"
                    value={movie.budget}
                    thousandSeparator
                  />
                </Text>
              </Flex>
            </Paper>
            <Paper shadow="sm" p={"sm"} bg={"dark.8"}>
              <Flex direction={"column"} align={"center"}>
                <Text size="sm" fw={500}>
                  Revenue
                </Text>
                <Text size="lg">
                  <NumberFormatter
                    prefix="$"
                    value={movie.revenue}
                    thousandSeparator
                  />
                </Text>
              </Flex>
            </Paper>
          </Group>
        </Box>
      </Flex>
    </Box>
  );
}
