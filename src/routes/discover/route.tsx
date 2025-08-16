import { Box, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box mt={"xl"}>
      <Title order={2} c={"cinkoGrey.2"}>
        Discover movies
      </Title>
    </Box>
  );
}
