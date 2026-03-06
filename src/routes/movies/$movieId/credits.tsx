import { Avatar, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "~/components/CustomLink";
import { IMAGES_BASE_URL } from "~/helpers";
import { movieQueryOptions } from "~/queries/movies";
import type { Crew } from "~/types/tmdb";

export const Route = createFileRoute("/movies/$movieId/credits")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(movieQueryOptions(params.movieId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(movieId));

  const organizedCrew = movie.credits.crew.reduce<Record<string, Crew[]>>(
    (acc, item) => {
      const department = item.department;
      if (!acc[department]) {
        acc[department] = [];
      }

      acc[department].push(item);
      return acc;
    },
    {},
  );

  return (
    <Stack>
      <CustomLink
        to="/movies/$movieId/details"
        params={{ movieId }}
        c={"white"}
        fw={700}
      >
        Return to details
      </CustomLink>

      <Stack gap={"sm"}>
        <Title order={2}>Cast</Title>

        <Grid justify="space-between">
          {movie.credits.cast.map((cast) => (
            <Grid.Col key={cast.id} span={6}>
              <Group>
                <Avatar
                  src={
                    cast.profile_path
                      ? `${IMAGES_BASE_URL}/w185/${cast.profile_path}`
                      : null
                  }
                  name={cast.name}
                  size={"xl"}
                />

                <Stack gap={"xs"}>
                  <Text fw={500}>{cast.name}</Text>
                  <Text c={"cinkoGrey.2"}>{cast.character}</Text>
                </Stack>
              </Group>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      <Stack gap={"sm"}>
        <Title order={2}>Crew</Title>

        <Stack>
          {Object.entries(organizedCrew).map((entry) => (
            <>
              <Title key={entry[0]} order={3} c={"cinkoGrey.3"}>
                {entry[0]}
              </Title>

              <Grid justify="space-between">
                {entry[1].map((member) => (
                  <Grid.Col key={member.id + member.credit_id} span={6}>
                    <Group>
                      <Avatar
                        src={
                          member.profile_path
                            ? `${IMAGES_BASE_URL}/w185/${member.profile_path}`
                            : null
                        }
                        name={member.name}
                        size={"xl"}
                      />

                      <Stack gap={"xs"}>
                        <Text fw={500}>{member.name}</Text>
                        <Text c={"cinkoGrey.2"}>{member.job}</Text>
                      </Stack>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
