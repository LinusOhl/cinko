import { Flex, Image, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { movieQueryOptions } from "../queries/movies.queries";

export const Route = createFileRoute("/movies/$movieId")({
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(movieQueryOptions(params.movieId));
  },
  component: MovieView,
});

function MovieView() {
  // TODO: possible to use Mantine CSS variable instead?
  const isMobile = useMediaQuery("(max-width: 36em)");

  const movie = Route.useLoaderData();

  return (
    <div>
      {/* Backdrop image */}
      <Image
        src={`http://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}`}
        alt={movie?.title || "Movie backdrop"}
        style={{
          width: isMobile ? "100vw" : "",
          marginLeft: isMobile ? "calc(-50vw + 50%)" : "",
        }}
      />

      {/* Content */}
      <Flex mt={isMobile ? "xs" : "lg"} gap={"md"}>
        {/* Poster image, rendered if NOT on mobile */}
        {!isMobile && (
          <Image
            src={`http://image.tmdb.org/t/p/w185/${movie?.poster_path}`}
            alt={movie?.title || "Movie poster"}
            w={"180"}
          />
        )}

        <div>
          {/* Title and director */}
          <Flex align={"baseline"} justify={"space-between"}>
            <Title order={1} size={"h2"}>
              {movie?.title}
            </Title>

            <Text c={"gray.5"}>
              directed by{" "}
              <Text c={"white"} span>
                Sean Baker
              </Text>
            </Text>
          </Flex>

          {/* Release date */}
          <Text size="sm" c={"gray.5"}>
            {movie?.release_date.slice(0, 4)}
          </Text>

          {/* Overview */}
          <Text mt={"lg"} c={"gray.5"}>
            {movie?.overview}
          </Text>
        </div>
      </Flex>
    </div>
  );
}
