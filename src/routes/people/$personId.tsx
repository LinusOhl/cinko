import {
  Flex,
  Group,
  Image,
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
import { personQueryOptions } from "~/queries/people";

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
    <Stack my={"xl"}>
      <Group align="flex-start" wrap="nowrap">
        <Image
          src={`${IMAGES_BASE_URL}/h632/${person.profile_path}`}
          w={312}
          radius={"md"}
        />

        <Stack>
          <Title order={1}>{person.name}</Title>

          <Spoiler maxHeight={220} showLabel="Show more" hideLabel="Hide">
            <Text>{person.biography}</Text>
          </Spoiler>
        </Stack>
      </Group>

      <Stack>
        <Title order={2}>Credits</Title>

        <Tabs defaultValue={"cast"} variant="outline" color="cinkoBlue">
          <Tabs.List grow>
            <Tabs.Tab value="cast">Cast</Tabs.Tab>
            <Tabs.Tab value="crew">Crew</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="cast">
            <Flex gap={"sm"} wrap={"wrap"}>
              {person.movie_credits.cast.map((movie) => (
                <MovieCredit key={movie.id} movie={movie} />
              ))}
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="crew">
            <Flex gap={"sm"} wrap={"wrap"}>
              {Array.from(cleanCrewCredits.values()).map((movie) => (
                <MovieCredit key={movie.id} movie={movie} />
              ))}
            </Flex>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Stack>
  );
}
