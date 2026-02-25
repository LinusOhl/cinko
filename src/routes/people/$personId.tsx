// import {
//   AspectRatio,
//   Box,
//   Card,
//   CardSection,
//   Center,
//   Combobox,
//   ComboboxChevron,
//   ComboboxDropdown,
//   ComboboxOptions,
//   ComboboxTarget,
//   Flex,
//   Grid,
//   GridCol,
//   Image,
//   InputBase,
//   InputPlaceholder,
//   ScrollArea,
//   ScrollAreaAutosize,
//   Table,
//   TableTbody,
//   TableTd,
//   TableTh,
//   TableTr,
//   Text,
//   Title,
//   Tooltip,
//   useCombobox,
// } from "@mantine/core";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useState } from "react";
// import { z } from "zod";
// import { getAge, getGender, IMAGES_BASE_URL } from "../../helpers";
// import { personQueryOptions } from "../../queries/people";

// export const Route = createFileRoute("/people/$personId")({
//   params: {
//     parse: (params) => ({
//       personId: z.number().int().parse(Number(params.personId)),
//     }),
//   },
//   loader: (opts) =>
//     opts.context.queryClient.ensureQueryData(
//       personQueryOptions(opts.params.personId),
//     ),
//   component: RouteComponent,
// });

// function RouteComponent() {
//   // Fetch person data
//   const params = Route.useParams();
//   const { data: person } = useSuspenseQuery(
//     personQueryOptions(params.personId),
//   );

//   const getAllJobs = () => {
//     const jobs = Array.from(
//       new Set(person.movie_credits?.crew.map((credit) => credit.job)),
//     );

//     if (person.movie_credits?.cast && person.movie_credits.cast.length > 0) {
//       jobs.push("Acting");
//     }

//     return jobs.sort();
//   };

//   const jobs = getAllJobs();

//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//   });

//   const [value, setValue] = useState<string | null>(jobs[0]);

//   const options = jobs.map((item) => (
//     <Combobox.Option key={item} value={item}>
//       {item}
//     </Combobox.Option>
//   ));

//   const filteredMovies =
//     value === "Acting"
//       ? person.movie_credits?.cast
//       : person.movie_credits?.crew.filter((credit) => credit.job === value);

//   const personGender = getGender(person.gender);
//   const personAge = getAge(person.birthday);

//   return (
//     <div>
//       <Grid mt={"xl"}>
//         <GridCol span={4}>
//           <Card
//             w={280}
//             shadow="md"
//             bg={"black"}
//             radius={"md"}
//             p={"0"}
//             bd={"1px solid dark"}
//           >
//             <CardSection>
//               {/* TODO: set up fallback src/element */}
//               <Image
//                 src={`${IMAGES_BASE_URL}/h632/${person.profile_path}`}
//                 alt={person.name}
//               />
//             </CardSection>

//             {/* Quick facts */}
//             <Table
//               variant="vertical"
//               layout="fixed"
//               c={"cinkoGrey.3"}
//               withRowBorders={false}
//             >
//               <TableTbody>
//                 {/* Name */}
//                 <TableTr>
//                   <TableTh fw={"bold"} bg={"none"}>
//                     Name
//                   </TableTh>
//                   <TableTd>{person.name}</TableTd>
//                 </TableTr>

//                 {/* Birthday & death */}
//                 <TableTr>
//                   <TableTh fw={"bold"} bg={"none"}>
//                     Born
//                   </TableTh>
//                   <TableTd>
//                     {person.birthday} ({personAge})
//                   </TableTd>
//                 </TableTr>

//                 {person.deathday && (
//                   <TableTr>
//                     <TableTh fw={"bold"} bg={"none"}>
//                       Died
//                     </TableTh>
//                     <TableTd>{person.deathday}</TableTd>
//                   </TableTr>
//                 )}

//                 {/* Gender */}
//                 <TableTr>
//                   <TableTh fw={"bold"} bg={"none"}>
//                     Gender
//                   </TableTh>
//                   <TableTd>{personGender}</TableTd>
//                 </TableTr>

//                 {/* Known for */}
//                 <TableTr>
//                   <TableTh fw={"bold"} bg={"none"}>
//                     Known for
//                   </TableTh>
//                   <TableTd>{person.known_for_department}</TableTd>
//                 </TableTr>
//               </TableTbody>
//             </Table>
//           </Card>
//         </GridCol>

//         {/* Biography */}
//         <GridCol span={8}>
//           <Box>
//             <Title order={1}>{person.name}</Title>

//             <ScrollArea h={250} type="always" scrollbars="y">
//               <Text c={"cinkoGrey.3"}>{person.biography}</Text>
//             </ScrollArea>
//           </Box>
//         </GridCol>
//       </Grid>

//       {/* Credits */}
//       <Box mt={"xl"}>
//         <Title order={2} mb={"sm"}>
//           Credits
//         </Title>

//         <Combobox
//           store={combobox}
//           onOptionSubmit={(val) => {
//             setValue(val);
//             combobox.closeDropdown();
//           }}
//         >
//           <ComboboxTarget>
//             <InputBase
//               component="button"
//               type="button"
//               rightSection={<ComboboxChevron />}
//               rightSectionPointerEvents="none"
//               onClick={() => combobox.toggleDropdown()}
//               pointer
//             >
//               {value || <InputPlaceholder>Pick value</InputPlaceholder>}
//             </InputBase>
//           </ComboboxTarget>

//           <ComboboxDropdown color="dark" bg={"dark"}>
//             <ComboboxOptions color="dark">
//               <ScrollAreaAutosize type="scroll" mah={200}>
//                 {options}
//               </ScrollAreaAutosize>
//             </ComboboxOptions>
//           </ComboboxDropdown>
//         </Combobox>
//       </Box>

//       <Flex my={"md"} wrap={"wrap"} gap={"md"}>
//         {filteredMovies
//           ?.sort((a, b) => b.popularity - a.popularity)
//           .map((movie) => (
//             <Tooltip
//               key={movie.id}
//               label={movie.title}
//               position="bottom"
//               withArrow
//             >
//               <Link
//                 to="/movies/$movieId"
//                 params={{ movieId: movie.id }}
//                 from="/"
//                 preload={false}
//               >
//                 <Card w={160} radius={"md"}>
//                   <CardSection>
//                     {movie.poster_path ? (
//                       <AspectRatio ratio={720 / 1080}>
//                         <Image
//                           src={`${IMAGES_BASE_URL}/w154/${movie.poster_path}`}
//                           alt=""
//                           fallbackSrc="https://placehold.co/80x120"
//                           fit="cover"
//                         />
//                       </AspectRatio>
//                     ) : (
//                       <Box w={160} h={240} bg={"dark"}>
//                         <Center w={160} h={240}>
//                           <Text c={"cinkoGrey.3"} ta={"center"}>
//                             {movie.title}
//                           </Text>
//                         </Center>
//                       </Box>
//                     )}
//                   </CardSection>
//                 </Card>
//               </Link>
//             </Tooltip>
//           ))}
//       </Flex>
//     </div>
//   );
// }
