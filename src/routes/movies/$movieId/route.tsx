import {
  Badge,
  Box,
  Center,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  List,
  ListItem,
  Overlay,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCircleFilled,
  IconConfettiFilled,
  IconDeviceTvOldFilled,
  IconDiscFilled,
  IconPlayerPlayFilled,
  IconTicket,
} from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";
import { CustomLink } from "../../../components/CustomLink";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { MovieRating } from "../../../features/ratings/components/MovieRating";
import { WatchlistButton } from "../../../features/watchlist/components/WatchlistButton";
import { IMAGES_BASE_URL } from "../../../helpers";
import { movieQueryOptions } from "../../../queryOptions/movies.queryOptions";

export const Route = createFileRoute("/movies/$movieId")({
  params: {
    parse: (params) => ({
      movieId: z.number().int().parse(Number(params.movieId)),
    }),
  },
  loader: ({ params: { movieId }, context }) =>
    context.queryClient.ensureQueryData(movieQueryOptions(movieId)),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.title} (${loaderData.release_date.slice(0, 4)}) - CINKO`,
          },
        ]
      : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();

  const { movieId } = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(movieId));

  const movieReleaseYear = movie.release_date.slice(0, 4);
  const movieLogo = movie.images?.logos.find((logo) => logo.iso_639_1 === "en");
  const directors = movie.credits?.crew?.filter(
    (person) => person.job === "Director",
  );

  const getReleaseTitle = (type: number) => {
    switch (type) {
      case 1:
        return "Premiere";
      case 2:
        return "Theatrical (limited)";
      case 3:
        return "Theatrical";
      case 4:
        return "Digital";
      case 5:
        return "Physical";
      case 6:
        return "TV";
      default:
        break;
    }
  };

  const getReleaseIcon = (type: number) => {
    switch (type) {
      case 1:
        return <IconConfettiFilled size={16} />;
      case 2:
        return <IconTicket size={16} />;
      case 3:
        return <IconTicket size={16} />;
      case 4:
        return <IconPlayerPlayFilled size={16} />;
      case 5:
        return <IconDiscFilled size={16} />;
      case 6:
        return <IconDeviceTvOldFilled size={16} />;
      default:
        break;
    }
  };

  return (
    <Box mt={"xl"}>
      {/* Backdrop image */}
      <Skeleton h={522} visible={!movie}>
        <Box pos={"relative"}>
          <Image
            src={`${IMAGES_BASE_URL}/w1280/${movie.backdrop_path}`}
            fallbackSrc="https://placehold.co/1280x720"
            alt={movie.title || "Movie backdrop"}
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
            {movieLogo?.file_path && (
              <Image
                src={`${IMAGES_BASE_URL}/w300/${movieLogo?.file_path}`}
                maw={"100%"}
                mah={"100%"}
                fit="contain"
              />
            )}
          </div>
        </Box>
      </Skeleton>

      {/* Content */}
      <Grid mt={"xs"}>
        {/* Left section */}
        <GridCol span={3}>
          {/* Poster */}
          {/* TODO: set up fallback src/element */}
          <Skeleton h={375} visible={!movie}>
            <Box w={"100%"}>
              {/* Poster */}
              <div
                style={{
                  backgroundImage: `url(${IMAGES_BASE_URL}/w500/${movie.poster_path})`,
                }}
                className={"movieCardImageBox"}
              >
                <div className={"movieCardBorderBox"} />
              </div>
            </Box>
          </Skeleton>

          {/* User actions */}
          <Paper radius={"md"} p={"xs"} mt={"sm"}>
            <Center>{user && <MovieRating userId={user.id} />}</Center>

            {/* TODO: Add to watchlist */}
            {user && <WatchlistButton userId={user.id} />}
          </Paper>

          <Paper radius={"md"} p={"xs"} mt={"sm"}>
            <Stack>
              <Box>
                <Text fw={500}>Releases (GB)</Text>

                <List listStyleType="none">
                  {movie.release_dates?.results
                    .find((release) => release.iso_3166_1 === "GB")
                    ?.release_dates.map((r) => (
                      <ListItem key={r.release_date + r.type}>
                        <Text>
                          {getReleaseTitle(r.type)} (
                          {r.release_date.slice(0, 4)})
                        </Text>
                      </ListItem>
                    ))}
                </List>
              </Box>

              <Box>
                <Text fw={500}>Languages</Text>

                <List listStyleType="none">
                  {movie.spoken_languages.map((lang) => (
                    <ListItem key={lang.iso_639_1} c={"cinkoGrey.2"}>
                      {lang.english_name}
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Text fw={500}>Genres</Text>

                <List listStyleType="none">
                  {movie.genres.map((genre) => (
                    <ListItem key={genre.id}>{genre.name}</ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Text fw={500}>Production companies</Text>

                <List listStyleType="none">
                  {movie.production_companies.map((company) => (
                    <ListItem key={company.id}>{company.name}</ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Text fw={500}>Production countries</Text>

                <List listStyleType="none">
                  {movie.production_countries.map((country) => (
                    <ListItem key={country.iso_3166_1}>{country.name}</ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
          </Paper>
        </GridCol>

        {/* Right section */}
        <GridCol span={9}>
          {/* Title and director */}
          <Grid align={"baseline"} justify={"space-between"}>
            <GridCol span={8}>
              <Title order={1} style={{ textWrap: "balance" }}>
                {movie.title}
              </Title>
            </GridCol>

            <GridCol span={4}>
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
            </GridCol>
          </Grid>

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

          <Outlet />
        </GridCol>
      </Grid>
    </Box>
  );
}
