import {
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
  Tooltip,
  useCombobox,
} from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { IMAGES_BASE_URL, getGender } from "../../helpers";
import { personQueryOptions } from "../../queryOptions/people.queryOptions";

export const Route = createFileRoute("/people/$personId")({
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(personQueryOptions(params.personId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  // Fetch person data
  const personId = Route.useParams().personId;
  const { data: person } = useSuspenseQuery(personQueryOptions(personId));

  // Filter out duplicates
  const uniqueMovies = Array.from(
    new Map(
      person.movie_credits?.crew?.map((movie) => [movie.id, movie]),
    ).values(),
  );

  const jobs = useMemo(() => {
    const values = Array.from(
      new Set(person.movie_credits?.crew.map((item) => item.job)),
    );
    return values;
  }, [person]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(jobs[0]);

  const options = jobs.map((item) => (
    <Combobox.Option key={item} value={item}>
      {item}
    </Combobox.Option>
  ));

  const filteredMovies = useMemo(() => {
    return person.movie_credits?.crew.filter((item) => item.job === value);
  }, [person, value]);

  // Gets the age of the person
  const getAge = (birthDateString: string | undefined) => {
    if (!birthDateString) return;

    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

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
              c={"dimmed"}
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

        <Grid.Col span={8}>
          {/* Biography */}
          <Box>
            <Text size="xl" fw={"500"}>
              {person.name}
            </Text>
            <ScrollArea h={250} type="always" scrollbars="y">
              <Text c={"dimmed"}>{person.biography}</Text>
            </ScrollArea>
          </Box>
        </Grid.Col>
      </Grid>

      {/* Credits */}
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
            // c={"cyan"}
            // color="black"
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

      <Flex mt={"xl"} wrap={"wrap"} gap={"sm"}>
        {filteredMovies
          ?.sort((a, b) => b.popularity - a.popularity)
          .map((movie) => (
            <Tooltip
              key={movie.id}
              label={movie.title}
              position="bottom"
              withArrow
            >
              <Link to="/movies/$movieId" params={{ movieId: movie.id }}>
                <Card w={100} radius={"md"}>
                  <Card.Section>
                    {movie.poster_path ? (
                      <Image
                        src={`${IMAGES_BASE_URL}/w154/${movie.poster_path}`}
                        fallbackSrc="https://placehold.co/80x120"
                        w={100}
                        h={140}
                      />
                    ) : (
                      <Box w={100} h={140} bg={"dark"}>
                        <Center w={100} h={140}>
                          <Text c={"dimmed"} ta={"center"}>
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
