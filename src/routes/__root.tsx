import { Button, Container, Flex, Text, TextInput, Title } from "@mantine/core";
import { useField } from "@mantine/form";
import { Notifications } from "@mantine/notifications";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  linkOptions,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { FormEvent } from "react";
import { CustomLink } from "../components/CustomLink";
import { SignOutButton } from "../features/auth/components/SignOutButton";
import { SignUpButton } from "../features/auth/components/SignUpButton";
import { useAuth } from "../features/auth/hooks/useAuth";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "../global.css";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    errorComponent: () => <div>Something went wrong!</div>,
  },
);

function RootComponent() {
  const { user, handleSignIn } = useAuth();

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

  const discoverLinkOptions = linkOptions({
    to: "/discover",
    from: "/",
    search: {
      page: 1,
      sortBy: "popularity.desc",
    },
    preload: false,
  });

  return (
    <Container>
      <Flex align={"center"} justify={"space-between"}>
        <Flex gap={"xl"} align={"center"}>
          <CustomLink to={"/"} preload={false}>
            <Title order={1} c={"cinkoYellow.7"}>
              CINKO
            </Title>
          </CustomLink>

          <CustomLink {...discoverLinkOptions} underline="hover">
            <Text c={"white"} fw={500}>
              Discover
            </Text>
          </CustomLink>
        </Flex>

        <form onSubmit={handleSubmit}>
          <TextInput {...field.getInputProps()} placeholder="Search..." />
        </form>

        <Flex gap={"xs"}>
          {user ? (
            <>
              <SignOutButton />

              <Button color="cinkoBlue" variant="light">
                Profile
              </Button>
            </>
          ) : (
            <>
              <SignUpButton />

              <Button
                color="cinkoBlue"
                variant="light"
                onClick={() => handleSignIn("glawrr@proton.me", "password")}
              >
                Sign in
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      <Notifications position="bottom-right" />

      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </Container>
  );
}
