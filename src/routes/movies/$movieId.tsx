import {
  Avatar,
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

          <Text mt={"xl"} fs={"italic"} c={"gray"}>
            {movie.tagline}
          </Text>

          {/* Overview */}
          <Text mt={"md"} c={"gray.5"}>
            {movie.overview}
          </Text>

          {/* Quick facts */}
          <Group mt={"xl"}>
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

          {/* Credits */}
          {/* Cast credits */}
          <Box mt={"xl"}>
            <Title order={2}>Cast</Title>
            <Flex direction={"column"} gap={"md"} mt={"sm"}>
              {movie.credits?.cast?.map((person) => (
                <Flex key={person.id} align={"center"} gap={"xl"}>
                  <Avatar
                    src={`${IMAGES_BASE_URL}/w185/${person.profile_path}`}
                    alt={person.name}
                    size={"lg"}
                    radius={"xl"}
                  />
                  <CustomLink
                    to="/people/$personId"
                    params={{ personId: person.id }}
                    c={"white"}
                    preloadDelay={2500}
                  >
                    <Text fw={500}>{person.name}</Text>
                  </CustomLink>
                  <Text ml={"auto"}>{person.character}</Text>
                </Flex>
              ))}
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
                          to="/people/$personId"
                          params={{ personId: member.id }}
                          preloadDelay={2500}
                          c={"white"}
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
