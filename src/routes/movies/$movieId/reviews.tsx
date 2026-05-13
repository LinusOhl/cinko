import { Center, Pagination, Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Review } from "~/components/features/reviews/Review/Review";

export const Route = createFileRoute("/movies/$movieId/reviews")({
  component: RouteComponent,
});

function RouteComponent() {
  const tempData = [
    { title: "5/5 would watch again", author: "Simon Belmont" },
    { title: "I liked the good parts!", author: "Luke Skywalker" },
    { title: "It could have been better if...", author: "Harry Potter" },
    { title: "well, this was fun!!", author: "King Arthur" },
    { title: "this film is like... family.", author: "Don Corleone" },
  ];

  return (
    <Stack mb="xl">
      {tempData.map((t) => (
        <Review
          key={t.author}
          author={t.author}
          title={t.title}
          simplified={false}
        />
      ))}

      <Center>
        <Pagination total={10} color="cinkoBlue.6" />
      </Center>
    </Stack>
  );
}
