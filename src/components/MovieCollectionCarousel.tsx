import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { collectionOptions } from "../queries/collections.queryOptions";
import { MovieCard } from "./MovieCard";

interface MovieCollectionCarouselProps {
  collectionId: number;
}

export const MovieCollectionCarousel = ({
  collectionId,
}: MovieCollectionCarouselProps) => {
  const { data: collection } = useSuspenseQuery(
    collectionOptions(collectionId),
  );

  return (
    <Box>
      <Title order={3} mb={"sm"} c={"cinkoGrey.3"}>
        Collection
      </Title>

      <Carousel
        slideGap={"md"}
        slideSize={"20%"}
        emblaOptions={{ dragFree: true, slidesToScroll: 4 }}
      >
        {collection.parts.map((m) => (
          <CarouselSlide key={m.id}>
            <MovieCard movie={m} />
          </CarouselSlide>
        ))}
      </Carousel>
    </Box>
  );
};
