import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
    <div>
      <p>person details page for {person.id}</p>
    </div>
  );
}
