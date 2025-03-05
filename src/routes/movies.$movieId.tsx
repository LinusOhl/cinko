import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { movieQueryOptions } from "../queries/movies.queries";

export const Route = createFileRoute("/movies/$movieId")({
	loader: async ({ params, context: { queryClient } }) => {
		return queryClient.ensureQueryData(movieQueryOptions(params.movieId));
	},
	component: MovieView,
});

function MovieView() {
	const movie = Route.useLoaderData();

	return (
		<div>
			<h3>MovieView {movie?.id}</h3>
			<p>{movie?.title}</p>
		</div>
	);
}
