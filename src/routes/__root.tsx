import { Anchor, Container, Flex, TextInput, Title } from "@mantine/core";
import { useField } from "@mantine/form";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FormEvent } from "react";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "../global.css";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    errorComponent: () => <div>Something went wrong!</div>,
  },
);

function RootComponent() {
  const navigate = useNavigate();
  const field = useField({
    initialValue: "",
    validate: (value) =>
      value.trim().length < 2 ? "Query is too short" : null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    field.validate();

    navigate({
      to: "/search",
      from: "/",
      search: { query: field.getValue(), page: 1 },
    });

    field.setValue("");
  };

  return (
    <Container>
      <Flex align={"center"} justify={"space-between"}>
        <Anchor component={Link} to={"/"} underline="never" preload={false}>
          <Title order={1} c={"cinkoYellow.7"}>
            CINKO
          </Title>
        </Anchor>

        <form onSubmit={handleSubmit}>
          <TextInput {...field.getInputProps()} placeholder="Search..." />
        </form>
      </Flex>

      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </Container>
  );
}
