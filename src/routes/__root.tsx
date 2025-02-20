import { Anchor, Container, Title } from "@mantine/core";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "@mantine/core/styles.css";
import "../index.css";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		component: RootComponent,
	},
);

function RootComponent() {
	return (
		<Container>
			<Anchor component={Link} to={"/"} c={"white"} underline="never">
				<Title order={1}>Revue</Title>
			</Anchor>

			<Outlet />
			<ReactQueryDevtools buttonPosition="bottom-left" />
			<TanStackRouterDevtools position="bottom-right" />
		</Container>
	);
}
