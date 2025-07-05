import {
  Avatar,
  Badge,
  Box,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FaCircle } from "react-icons/fa6";
import { z } from "zod";
import { CustomLink } from "../../components/CustomLink";
import { IMAGES_BASE_URL, groupCrewByJob } from "../../helpers";
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

  const groupedCrew = groupCrewByJob(movie.credits?.crew);

  return (
    <Box mt={"xl"}>
      {/* Backdrop image */}
      <Image
        src={`${IMAGES_BASE_URL}/w1280/${movie.backdrop_path}`}
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
            src={`${IMAGES_BASE_URL}/w185/${movie.poster_path}`}
            alt={movie.title || "Movie poster"}
            w={"180"}
            h={"260"}
            radius={"md"}
          />
        )}

        <Box>
          {/* Title and director */}
          <Flex align={"baseline"} justify={"space-between"}>
            <Title order={1}>{movie.title}</Title>

            <Text c={"cinkoGrey.3"}>
              directed by{" "}
              <CustomLink
                underline="hover"
                c={"white"}
                fw={500}
                to={"/people/$personId"}
                params={{
                  personId: Number(director?.id),
                }}
                from="/"
                preloadDelay={2000}
              >
                {director?.name}
              </CustomLink>
            </Text>
          </Flex>

          {/* Quick facts */}
          <Group gap={"xs"}>
            {/* Release year */}
            <Text size="sm" c={"cinkoGrey.3"}>
              {movieReleaseYear}
            </Text>

            <FaCircle size={6} color="#bba6a6" />

            {/* Runtime */}
            <Text size="sm" c={"cinkoGrey.3"}>
              {movie.runtime}min
            </Text>

            <FaCircle size={6} color="#bba6a6" />

            {/* Genres */}
            {movie.genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="light"
                size="sm"
                color="cinkoYellow"
              >
                {genre.name}
              </Badge>
            ))}
          </Group>

          <Text mt={"xl"} fs={"italic"} c={"cinkoGrey.2"}>
            {movie.tagline}
          </Text>

          {/* Overview */}
          <Text mt={"md"} c={"cinkoGrey.3"}>
            {movie.overview}
          </Text>

          {/* Credits */}
          {/* Cast credits */}
          <Box mt={"xl"}>
            <Title order={2}>Cast</Title>
            <Flex direction={"column"} gap={"md"} mt={"sm"}>
              <Grid>
                {movie.credits?.cast?.map((person) => (
                  <Grid.Col key={person.id} span={6}>
                    <Flex align={"center"} gap={"xl"}>
                      <Avatar
                        src={
                          person.profile_path
                            ? `${IMAGES_BASE_URL}/w185/${person.profile_path}`
                            : null
                        }
                        alt={person.name}
                        size={"lg"}
                        radius={"xl"}
                      />

                      <Flex direction={"column"}>
                        <CustomLink
                          c={"white"}
                          to="/people/$personId"
                          params={{ personId: person.id }}
                          from="/"
                          preloadDelay={2500}
                        >
                          <Text fw={500}>{person.name}</Text>
                        </CustomLink>

                        <Text c={"cinkoGrey.3"}>{person.character}</Text>
                      </Flex>
                    </Flex>
                  </Grid.Col>
                ))}
              </Grid>
            </Flex>
          </Box>

          {/* Crew credits */}
          <Box my={"xl"}>
            <Title order={2}>Crew</Title>
            {groupedCrew
              ?.sort((a, b) => a.department.localeCompare(b.department))
              .map((group) => (
                <Box key={group.department} mt={"md"}>
                  <Text fw={700}>{group.department}</Text>
                  {group.members
                    .sort((a, b) => a.job.localeCompare(b.job))
                    .map((member) => (
                      <Flex key={member.credit_id}>
                        <CustomLink
                          c={"white"}
                          to="/people/$personId"
                          params={{ personId: member.id }}
                          from="/"
                          preloadDelay={2500}
                        >
                          <Text>{member.name}</Text>
                        </CustomLink>
                        <Text ml={"auto"}>{member.job}</Text>
                      </Flex>
                    ))}
                </Box>
              ))}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
