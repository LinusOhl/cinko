import {
  Accordion,
  Avatar,
  Box,
  Flex,
  Grid,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "../../../components/CustomLink";
import { IMAGES_BASE_URL, groupCrewByJob } from "../../../helpers";
import { movieQueryOptions } from "../../../queryOptions/movies.queryOptions";

export const Route = createFileRoute("/movies/$movieId/credits")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      movieQueryOptions(opts.params.movieId),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(params.movieId));

  const groupedCrew = groupCrewByJob(movie.credits?.crew);

  return (
    <>
      <Box mt={"xl"}>
        <CustomLink
          to="/movies/$movieId/details"
          params={{ movieId: params.movieId }}
          from="/"
          preload={false}
          display={"inline-flex"}
        >
          <Flex align={"center"} gap={"xs"} mb={"md"}>
            <IconChevronLeft size={18} />

            <Text>Back to details</Text>
          </Flex>
        </CustomLink>

        <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
          Cast
        </Title>

        <Spoiler showLabel="Show more" hideLabel={"Hide"} maxHeight={360}>
          <Flex direction={"column"} gap={"md"} mt={"sm"}>
            <Grid>
              {movie.credits?.cast?.map((person) => (
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
        </Spoiler>
      </Box>

      <Box mt={"xl"}>
        <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
          Crew
        </Title>

        <Accordion variant="default">
          {groupedCrew
            ?.sort((a, b) => a.department.localeCompare(b.department))
            .map((group) => (
              <Accordion.Item
                key={group.department}
                value={group.department}
                bg={"transparent"}
              >
                <Accordion.Control>
                  <Text fw={700} c={"white"}>
                    {group.department}
                  </Text>
                </Accordion.Control>

                <Accordion.Panel>
                  {group.members
                    .sort((a, b) => a.job.localeCompare(b.job))
                    .map((member) => (
                      <Flex key={member.credit_id}>
                        <CustomLink
                          c={"white"}
                          to="/people/$personId"
                          params={{ personId: member.id }}
                          from="/"
                          preload={false}
                        >
                          <Text>{member.name}</Text>
                        </CustomLink>

                        <Text ml={"auto"}>{member.job}</Text>
                      </Flex>
                    ))}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
        </Accordion>
      </Box>
    </>
  );
}
