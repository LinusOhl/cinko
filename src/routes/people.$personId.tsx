import { Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { personQueryOptions } from "../queries/people.queries";

export const Route = createFileRoute("/people/$personId")({
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(personQueryOptions(params.personId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const person = Route.useLoaderData();

  console.log("person", person);

  return (
    <div>
      <Title>{person?.name}</Title>
    </div>
  );
}
