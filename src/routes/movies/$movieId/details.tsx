import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { movieQueryOptions } from "~/queries/movies";

export const Route = createFileRoute("/movies/$movieId/details")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(movieQueryOptions(params.movieId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(movieId));

  return (
    <div>
      <p>details page for {movie.title}</p>
    </div>
  );
}
