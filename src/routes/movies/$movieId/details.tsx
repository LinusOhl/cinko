import { Carousel } from "@mantine/carousel";
import {
  // AspectRatio,
  Avatar,
  Box,
  // Button,
  // Divider,
  Flex,
  Grid,
  // Stack,
  Text,
  // Textarea,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
// import { useState } from "react";
import { CustomLink } from "../../../components/CustomLink";
import { MovieCard } from "../../../components/MovieCard";
import { MovieCollectionCarousel } from "../../../components/MovieCollectionCarousel";
import { MovieReviews } from "../../../components/MovieReviews/MovieReviews";
import { IMAGES_BASE_URL } from "../../../helpers";
import { useAuth } from "../../../hooks/useAuth";
// import { useReviewMovie } from "../../../hooks/useReviewMovie";
import { movieQueryOptions } from "../../../queryOptions/movies.queryOptions";

export const Route = createFileRoute("/movies/$movieId/details")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      movieQueryOptions(opts.params.movieId),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();

  const params = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(params.movieId));

  // const reviewMovieMutation = useReviewMovie();

  // const [reviewValue, setReviewValue] = useState<string>("");

  // const handleReviewSubmit = (text: string) => {
  //   if (!user) return;

  //   reviewMovieMutation.mutate({
  //     text: text,
  //     movieId: movie.id,
  //     userId: user.id,
  //   });

  //   setReviewValue("");
  // };

  // const movieTrailer = movie.videos?.results.find(
  //   (v) => v.type === "Trailer" && v.iso_639_1 === "en",
  // );

  return (
    <>
      <Text mt={"xl"} fs={"italic"} c={"cinkoGrey.2"}>
        {movie.tagline}
      </Text>

      {/* Overview */}
      <Text mt={"md"} c={"cinkoGrey.3"}>
        {movie.overview}
      </Text>

      {/* Cast credits */}
      <Box mt={"xl"}>
        <CustomLink
          to="/movies/$movieId/credits"
          params={{ movieId: params.movieId }}
          from="/"
          preload={false}
          display={"inline-flex"}
          style={{ textDecorationColor: "#1e2ede" }}
        >
          <Flex align={"center"} gap={"xs"}>
            <Title order={2} c={"cinkoGrey.2"}>
              Credits
            </Title>

            <IconChevronRight color="#d3c5c5" size={22} />
          </Flex>
        </CustomLink>

        <Flex direction={"column"} gap={"md"} mt={"sm"}>
          <Grid>
            {movie.credits?.cast?.slice(0, 6).map((person) => (
              <Grid.Col key={person.id} span={6}>
                <Flex align={"center"} gap={"xl"}>
                  <Avatar
                    src={
                      person.profile_path
                        ? `${IMAGES_BASE_URL}/w185/${person.profile_path}`
                        : null
                    }
                    alt={person.name}
                    size={"lg"}
                    radius={"xl"}
                  />

                  <Flex direction={"column"}>
                    <CustomLink
                      c={"white"}
                      to="/people/$personId"
                      params={{ personId: person.id }}
                      from="/"
                      preload={false}
                    >
                      <Text fw={500}>{person.name}</Text>
                    </CustomLink>

                    <Text c={"cinkoGrey.3"}>{person.character}</Text>
                  </Flex>
                </Flex>
              </Grid.Col>
            ))}
          </Grid>
        </Flex>
      </Box>

      {/* Reviews */}
      {/* <Box mt={"xl"}>
        <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
          Reviews
        </Title>

        <Stack gap={"sm"}>
          <Textarea
            value={reviewValue}
            onChange={(event) => setReviewValue(event.currentTarget.value)}
            label={"Write a review for the movie!"}
            placeholder="Review goes here..."
            resize="vertical"
            size="md"
            minRows={4}
            autosize
          />

          <Button
            color="cinkoBlue.7"
            style={{ alignSelf: "flex-end" }}
            onClick={() => {
              console.log("reviewValue:", reviewValue);
              handleReviewSubmit(reviewValue);
            }}
            disabled={reviewValue.trim().length <= 0}
          >
            Submit
          </Button>
        </Stack>

        <Divider my={"md"} />
      </Box> */}

      <MovieReviews userId={user?.id} />

      {/* Extra */}
      <Box mt={"xl"}>
        <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
          Extra
        </Title>

        {/* Movie collection */}
        {movie.belongs_to_collection && (
          <MovieCollectionCarousel
            collectionId={movie.belongs_to_collection.id}
          />
        )}

        {/* Similar movies */}
        <Title order={3} mb={"sm"} c={"cinkoGrey.3"}>
          Similar movies
        </Title>

        <Carousel
          slideGap={"md"}
          slideSize={"20%"}
          emblaOptions={{ dragFree: true, slidesToScroll: 4 }}
        >
          {movie.similar?.results.slice(0, 12).map((m) => (
            <Carousel.Slide key={m.id}>
              <MovieCard movie={m} />
            </Carousel.Slide>
          ))}
        </Carousel>

        {/* TODO: disabled for now, look at a later stage! */}
        {/* <AspectRatio ratio={16 / 9} mt={"xl"}>
          <iframe
            src={`https://www.youtube.com/embed/${movieTrailer?.key}`}
            title={movieTrailer?.name}
            style={{ border: 0 }}
          />
        </AspectRatio> */}
      </Box>
    </>
  );
}
