import { Carousel } from "@mantine/carousel";
import {
  Accordion,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Overlay,
  Rating,
  Skeleton,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCircleFilled, IconPlus } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CustomLink } from "../../components/CustomLink";
import { MovieCard } from "../../components/MovieCard";
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
  const directors = movie.credits?.crew?.filter(
    (person) => person.job === "Director",
  );

  const movieLogo = movie.images?.logos.find((logo) => logo.iso_639_1 === "en");

  const groupedCrew = groupCrewByJob(movie.credits?.crew);

  return (
    <Box mt={"xl"}>
      {/* Backdrop image */}
      <Skeleton h={522} visible={!movie}>
        <Box pos={"relative"}>
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

          {/* Fade-effect of backdrop image */}
          <Overlay
            bg={`
              radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 60%, #02040f 100%), 
              linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, #02040f 100%),
              linear-gradient(to left, rgba(0, 0, 0, 0) 90%, #02040f 100%),
              linear-gradient(to right, rgba(0, 0, 0, 0) 90%, #02040f 100%)
            `}
          />

          {/* Movie logo */}
          <div className="movie-logo-wrapper">
            <Image
              src={`${IMAGES_BASE_URL}/w300/${movieLogo?.file_path}`}
              maw={"100%"}
              mah={"100%"}
              fit="contain"
            />
          </div>
        </Box>
      </Skeleton>

      {/* Content */}
      <Grid mt={"xs"}>
        {/* Left section */}
        <Grid.Col span={3}>
          {/* Poster */}
          <Card
            w={220}
            shadow="md"
            bg={"black"}
            radius={"md"}
            p={"0"}
            bd={"1px solid dark"}
          >
            <Card.Section>
              {/* TODO: set up fallback src/element */}
              <Skeleton h={375} visible={!movie}>
                <Image
                  src={`${IMAGES_BASE_URL}/h632/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Skeleton>
            </Card.Section>

            {/* TODO: Rating system */}
            <Center py={"xs"}>
              <Rating size={"xl"} />
            </Center>

            {/* TODO: Add to watchlist */}
            <Button
              color="cinkoBlue"
              leftSection={<IconPlus size={18} color="#e5dada" stroke={3} />}
              radius={"0"}
            >
              Add to watchlist
            </Button>
          </Card>
        </Grid.Col>

        {/* Right section */}
        <Grid.Col span={9}>
          {/* Title and director */}
          <Flex align={"baseline"} justify={"space-between"}>
            <Title order={1} style={{ textWrap: "balance" }}>
              {movie.title}
            </Title>

            <Group align="baseline" gap={"xs"}>
              <Text c={"cinkoGrey.3"}>directed by</Text>

              <Stack gap={"xs"}>
                {directors?.map((director) => (
                  <CustomLink
                    key={director.id}
                    underline="hover"
                    c={"white"}
                    fw={500}
                    to="/people/$personId"
                    params={{ personId: Number(director.id) }}
                    from="/"
                    preload={false}
                  >
                    {director.name}
                  </CustomLink>
                ))}
              </Stack>
            </Group>
          </Flex>

          {/* Quick facts */}
          <Group gap={"xs"} mt={"xs"}>
            {/* Release year */}
            <Text size="sm" c={"cinkoGrey.3"}>
              {movieReleaseYear}
            </Text>

            <IconCircleFilled size={6} color="#bba6a6" />

            {/* Runtime */}
            <Text size="sm" c={"cinkoGrey.3"}>
              {movie.runtime}min
            </Text>

            <IconCircleFilled size={6} color="#bba6a6" />

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
            <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
              Credits
            </Title>

            <Title order={3} mb={"sm"} c={"cinkoGrey.3"}>
              Cast
            </Title>

            <Spoiler showLabel="Show more" hideLabel={"Hide"} maxHeight={360}>
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
                            preload={false}
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
            </Spoiler>
          </Box>

          {/* Crew credits */}
          <Box mt={"xl"}>
            <Title order={3} mb={"sm"} c={"cinkoGrey.3"}>
              Crew
            </Title>

            <Accordion variant="default">
              {groupedCrew
                ?.sort((a, b) => a.department.localeCompare(b.department))
                .map((group) => (
                  <Accordion.Item
                    key={group.department}
                    value={group.department}
                    bg={"transparent"}
                  >
                    <Accordion.Control>
                      <Text fw={700} c={"white"}>
                        {group.department}
                      </Text>
                    </Accordion.Control>

                    <Accordion.Panel>
                      {group.members
                        .sort((a, b) => a.job.localeCompare(b.job))
                        .map((member) => (
                          <Flex key={member.credit_id}>
                            <CustomLink
                              c={"white"}
                              to="/people/$personId"
                              params={{ personId: member.id }}
                              from="/"
                              preload={false}
                            >
                              <Text>{member.name}</Text>
                            </CustomLink>

                            <Text ml={"auto"}>{member.job}</Text>
                          </Flex>
                        ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
            </Accordion>
          </Box>

          {/* Extra */}
          <Box mt={"xl"}>
            <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
              Extra
            </Title>

            <Title order={3} mb={"sm"} c={"cinkoGrey.3"}>
              Similar movies
            </Title>

            <Carousel
              slideGap={"md"}
              slideSize={"20%"}
              emblaOptions={{ dragFree: true }}
            >
              {movie.similar?.results.slice(0, 12).map((m) => (
                <Carousel.Slide key={m.id}>
                  <MovieCard movie={m} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
