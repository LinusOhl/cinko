import { List, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	nowPlayingMoviesQueryOptions,
	popularMoviesQueryOptions,
	topRatedMoviesQueryOptions,
} from "../queries/movies.queries";

export const Route = createFileRoute("/")({
	loader: ({ context: { queryClient } }) =>
		Promise.all([
			queryClient.ensureQueryData(popularMoviesQueryOptions),
			queryClient.ensureQueryData(topRatedMoviesQueryOptions),
			queryClient.ensureQueryData(nowPlayingMoviesQueryOptions),
		]),
	component: HomeComponent,
});

function HomeComponent() {
	const { data: popularMovies } = useSuspenseQuery(popularMoviesQueryOptions);
	const { data: topRatedMovies } = useSuspenseQuery(topRatedMoviesQueryOptions);
	const { data: nowPlayingMovies } = useSuspenseQuery(
		nowPlayingMoviesQueryOptions,
	);

	return (
		<div>
			<div>
				<Title order={2}>Popular movies</Title>
				<List>
					{popularMovies?.results.map((movie) => (
						<List.Item key={movie.id}>{movie.title}</List.Item>
					))}
				</List>
			</div>

			<div>
				<Title order={2}>Top rated movies</Title>
				<List>
					{topRatedMovies?.results.map((movie) => (
						<List.Item key={movie.id}>{movie.title}</List.Item>
					))}
				</List>
			</div>

			<div>
				<Title order={2}>Now playing movies</Title>
				<List>
					{nowPlayingMovies?.results.map((movie) => (
						<List.Item key={movie.id}>{movie.title}</List.Item>
					))}
				</List>
			</div>
		</div>
	);
}
