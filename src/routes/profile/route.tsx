import { Box, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../features/auth/hooks/useAuth";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();

  return (
    <Box mt={"xl"}>
      {/* Display profile name */}
      <Title>Hello, {user?.email}</Title>

      {/* Watchlist, links to movie */}

      {/* List of user reviews, links to movie */}

      {/* List of user ratings, links to movie */}
    </Box>
  );
}
