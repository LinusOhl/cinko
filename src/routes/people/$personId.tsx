import { Group, Image, Stack, Text, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
          <Text>{person.biography}</Text>
        </Stack>
      </Group>
    </Stack>
  );
}
