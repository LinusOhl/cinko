import { Box, Card, Center, Flex, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();

  const { data: watchlist } = useWatchlist(userId);

  return (
    <Box mt={"xl"}>
      {/* Display profile name */}
      <Title order={1}>Hello, {user?.email}</Title>

      {/* Watchlist, links to movie */}
      <Box mt={"xl"}>
        <Title order={2} c={"cinkoGrey.2"}>
          Your watchlist
        </Title>

        <Flex mt={"md"} gap={"md"}>
          {watchlist?.map((item) => (
            <CustomLink
              key={item.id}
              to="/movies/$movieId/details"
              params={{ movieId: item.movie_id }}
              from="/profile/$userId"
              preload={false}
            >
              <Card w={160} h={240}>
                <Center h={240}>{item.movie_id}</Center>
              </Card>
            </CustomLink>
          ))}
        </Flex>
      </Box>

      {/* List of user reviews, links to movie */}

      {/* List of user ratings, links to movie */}
    </Box>
  );
}
