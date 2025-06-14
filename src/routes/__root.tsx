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
import "../global.css";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    errorComponent: () => <div>Something went wrong!</div>,
  },
);

function RootComponent() {
  return (
    <Container>
      <Anchor component={Link} to={"/"} underline="never">
        <Title order={1} c={"cinkoYellow.7"}>
          CINKO
        </Title>
      </Anchor>

      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </Container>
  );
}
