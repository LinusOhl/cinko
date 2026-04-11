import { Avatar, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "~/components/CustomLink";
import { IMAGES_BASE_URL } from "~/helpers";
import { movieQueryOptions } from "~/server/tmdb/movies/movies.queries";

export const Route = createFileRoute("/movies/$movieId/details")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(movieQueryOptions(params.movieId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(movieId));

  return (
    <Stack>
      <Group gap="xs">
        <Title order={2}>Cast</Title>
        <Text>({movie.credits.cast.length})</Text>
      </Group>

      <Grid justify="space-between">
        {movie.credits.cast.slice(0, 10).map((cast) => (
          <Grid.Col key={cast.id} span={6}>
            <Group>
              <Avatar
                src={`${IMAGES_BASE_URL}/w185/${cast.profile_path}`}
                size="xl"
              />

              <Stack gap={"xs"}>
                <CustomLink
                  to="/people/$personId"
                  params={{ personId: cast.id.toString() }}
                  preload={false}
                  c="white"
                  fw={500}
                >
                  {cast.name}
                </CustomLink>
                <Text>{cast.character}</Text>
              </Stack>
            </Group>
          </Grid.Col>
        ))}
      </Grid>

      <div style={{ width: "fit-content" }}>
        <CustomLink
          to="/movies/$movieId/credits"
          params={{ movieId }}
          c="white"
          fw={700}
          fz="lg"
        >
          All cast & crew
        </CustomLink>
      </div>
    </Stack>
  );
}
