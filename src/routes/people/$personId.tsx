import {
  Flex,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Spoiler,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MovieCredit } from "~/components/features/movies/MovieCredit";
import { IMAGES_BASE_URL } from "~/helpers";
import { personQueryOptions } from "~/server/tmdb/people/people.queries";

export const Route = createFileRoute("/people/$personId")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(personQueryOptions(params.personId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { personId } = Route.useParams();
  const { data: person } = useSuspenseQuery(personQueryOptions(personId));

  const cleanCrewCredits = new Map(
    person.movie_credits.crew.map((m) => [m.id, m]),
  );

  return (
    <Stack my="xl">
      <Group align="flex-start" wrap="nowrap">
        <Image
          src={`${IMAGES_BASE_URL}/h632/${person.profile_path}`}
          w={312}
          radius="md"
        />

        <Stack gap="lg">
          <Title order={1}>{person.name}</Title>

          <Spoiler maxHeight={220} showLabel="Show more" hideLabel="Hide">
            <Text>{person.biography}</Text>
          </Spoiler>

          <SimpleGrid cols={3}>
            <Paper bg="dark" p="xs">
              <Stack ta="center" gap="xs">
                <Text tt="uppercase">Known for</Text>
                <Text fw={600} fz="lg">
                  {person.known_for_department}
                </Text>
              </Stack>
            </Paper>

            <Paper bg="dark" p="xs">
              <Stack ta="center" gap="xs">
                <Text tt="uppercase">Birthday</Text>
                <Text fw={600} fz="lg">
                  {person.birthday}
                </Text>
              </Stack>
            </Paper>

            {person.deathday && (
              <Paper bg="dark" p="xs">
                <Stack ta="center" gap="xs">
                  <Text tt="uppercase">Died</Text>
                  <Text fw={600} fz="lg">
                    {person.deathday}
                  </Text>
                </Stack>
              </Paper>
            )}

            {person.also_known_as.length > 0 && (
              <Paper bg="dark" p="xs">
                <Stack ta="center" gap="xs">
                  <Text tt="uppercase">AKA.</Text>
                  <Text fw={600} fz="lg">
                    {person.also_known_as[0]}
                  </Text>
                </Stack>
              </Paper>
            )}
          </SimpleGrid>
        </Stack>
      </Group>

      <Stack>
        <Title order={2}>Credits</Title>

        <Tabs defaultValue="cast" variant="outline" color="cinkoBlue">
          <Tabs.List grow>
            <Tabs.Tab value="cast">
              Cast ({person.movie_credits.cast.length})
            </Tabs.Tab>
            <Tabs.Tab value="crew">
              Crew ({Array.from(cleanCrewCredits.values()).length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="cast">
            <Flex gap="sm" wrap="wrap">
              {person.movie_credits.cast.map((movie) => (
                <MovieCredit
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  work={movie.character}
                />
              ))}
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="crew">
            <Flex gap="sm" wrap="wrap">
              {Array.from(cleanCrewCredits.values()).map((movie) => (
                <MovieCredit
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  work={movie.job}
                />
              ))}
            </Flex>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Stack>
  );
}
