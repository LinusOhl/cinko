import {
  AspectRatio,
  Box,
  Card,
  Center,
  Combobox,
  Flex,
  Grid,
  Image,
  Input,
  InputBase,
  ScrollArea,
  Table,
  Text,
  Title,
  Tooltip,
  useCombobox,
} from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { IMAGES_BASE_URL, getAge, getGender } from "../../helpers";
import { personQueryOptions } from "../../queryOptions/people.queryOptions";

export const Route = createFileRoute("/people/$personId")({
  params: {
    parse: (params) => ({
      personId: z.number().int().parse(Number(params.personId)),
    }),
  },
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      personQueryOptions(opts.params.personId),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  // Fetch person data
  const params = Route.useParams();
  const { data: person } = useSuspenseQuery(
    personQueryOptions(params.personId),
  );

  const getAllJobs = () => {
    const jobs = Array.from(
      new Set(person.movie_credits?.crew.map((credit) => credit.job)),
    );

    if (person.movie_credits?.cast && person.movie_credits.cast.length > 0) {
      jobs.push("Acting");
    }

    return jobs.sort();
  };

  const jobs = getAllJobs();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(jobs[0]);

  const options = jobs.map((item) => (
    <Combobox.Option key={item} value={item}>
      {item}
    </Combobox.Option>
  ));

  const filteredMovies =
    value === "Acting"
      ? person.movie_credits?.cast
      : person.movie_credits?.crew.filter((credit) => credit.job === value);

  const personGender = getGender(person.gender);
  const personAge = getAge(person.birthday);

  return (
    <div>
      <Grid mt={"xl"}>
        <Grid.Col span={4}>
          <Card
            w={280}
            shadow="md"
            bg={"black"}
            radius={"md"}
            p={"0"}
            bd={"1px solid dark"}
          >
            <Card.Section>
              {/* TODO: set up fallback src/element */}
              <Image
                src={`${IMAGES_BASE_URL}/h632/${person.profile_path}`}
                alt={person.name}
              />
            </Card.Section>

            {/* Quick facts */}
            <Table
              variant="vertical"
              layout="fixed"
              c={"cinkoGrey.3"}
              withRowBorders={false}
            >
              <Table.Tbody>
                {/* Name */}
                <Table.Tr>
                  <Table.Th fw={"bold"} bg={"none"}>
                    Name
                  </Table.Th>
                  <Table.Td>{person.name}</Table.Td>
                </Table.Tr>

                {/* Birthday & death */}
                <Table.Tr>
                  <Table.Th fw={"bold"} bg={"none"}>
                    Born
                  </Table.Th>
                  <Table.Td>
                    {person.birthday} ({personAge})
                  </Table.Td>
                </Table.Tr>

                {person.deathday && (
                  <Table.Tr>
                    <Table.Th fw={"bold"} bg={"none"}>
                      Died
                    </Table.Th>
                    <Table.Td>{person.deathday}</Table.Td>
                  </Table.Tr>
                )}

                {/* Gender */}
                <Table.Tr>
                  <Table.Th fw={"bold"} bg={"none"}>
                    Gender
                  </Table.Th>
                  <Table.Td>{personGender}</Table.Td>
                </Table.Tr>

                {/* Known for */}
                <Table.Tr>
                  <Table.Th fw={"bold"} bg={"none"}>
                    Known for
                  </Table.Th>
                  <Table.Td>{person.known_for_department}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        {/* Biography */}
        <Grid.Col span={8}>
          <Box>
            <Title order={1}>{person.name}</Title>

            <ScrollArea h={250} type="always" scrollbars="y">
              <Text c={"cinkoGrey.3"}>{person.biography}</Text>
            </ScrollArea>
          </Box>
        </Grid.Col>
      </Grid>

      {/* Credits */}
      <Box mt={"xl"}>
        <Title order={2} mb={"sm"}>
          Credits
        </Title>

        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
              pointer
            >
              {value || <Input.Placeholder>Pick value</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown color="dark" bg={"dark"}>
            <Combobox.Options color="dark">
              <ScrollArea.Autosize type="scroll" mah={200}>
                {options}
              </ScrollArea.Autosize>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Box>

      <Flex my={"md"} wrap={"wrap"} gap={"md"}>
        {filteredMovies
          ?.sort((a, b) => b.popularity - a.popularity)
          .map((movie) => (
            <Tooltip
              key={movie.id}
              label={movie.title}
              position="bottom"
              withArrow
            >
              <Link
                to="/movies/$movieId"
                params={{ movieId: movie.id }}
                from="/"
                preloadDelay={2500}
              >
                <Card w={160} radius={"md"}>
                  <Card.Section>
                    {movie.poster_path ? (
                      <AspectRatio ratio={720 / 1080}>
                        <Image
                          src={`${IMAGES_BASE_URL}/w154/${movie.poster_path}`}
                          alt=""
                          fallbackSrc="https://placehold.co/80x120"
                          fit="cover"
                        />
                      </AspectRatio>
                    ) : (
                      <Box w={160} h={240} bg={"dark"}>
                        <Center w={160} h={240}>
                          <Text c={"cinkoGrey.3"} ta={"center"}>
                            {movie.title}
                          </Text>
                        </Center>
                      </Box>
                    )}
                  </Card.Section>
                </Card>
              </Link>
            </Tooltip>
          ))}
      </Flex>
    </div>
  );
}
