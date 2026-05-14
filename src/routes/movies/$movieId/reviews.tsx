import {
  Center,
  Group,
  Pagination,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "~/components/CustomLink";
import { Review } from "~/components/features/reviews/Review/Review";

export const Route = createFileRoute("/movies/$movieId/reviews")({
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();

  const theme = useMantineTheme();

  const tempData = [
    { title: "5/5 would watch again", author: "Simon Belmont" },
    { title: "I liked the good parts!", author: "Luke Skywalker" },
    { title: "It could have been better if...", author: "Harry Potter" },
    { title: "well, this was fun!!", author: "King Arthur" },
    { title: "this film is like... family.", author: "Don Corleone" },
  ];

  return (
    <Stack mb="xl" gap="xl">
      <CustomLink
        to="/movies/$movieId/details"
        params={{ movieId }}
        fz="h4"
        ff="heading"
        fw={700}
        c="white"
      >
        <Group gap="xs">
          <IconChevronLeft color={theme.white} />
          Return to movie details
        </Group>
      </CustomLink>

      <Stack>
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
    </Stack>
  );
}
