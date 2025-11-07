import {
  Button,
  Container,
  Flex,
  MantineProvider,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useField } from "@mantine/form";
import { Notifications } from "@mantine/notifications";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  linkOptions,
  Outlet,
  Scripts,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { FormEvent, ReactNode } from "react";
import { CustomLink } from "../components/CustomLink";
import { theme } from "../config/theme";
import { AuthProvider } from "../contexts/AuthContext";
import { SignInButton } from "../features/auth/components/SignInButton";
import { SignOutButton } from "../features/auth/components/SignOutButton";
import { SignUpButton } from "../features/auth/components/SignUpButton";
import { useAuth } from "../features/auth/hooks/useAuth";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "../global.css";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "CINKO - Movie Database",
        },
      ],
      links: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap",
        },
      ],
    }),
    component: RootComponent,
    errorComponent: () => <div>Something went wrong!</div>,
  },
);

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        {children}
      </MantineProvider>
    </AuthProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const discoverLinkOptions = linkOptions({
    to: "/discover",
    from: "/",
    search: {
      page: 1,
      sortBy: "popularity.desc",
    },
    preload: false,
  });

  return (
    <html lang="en-US">
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Container>
            <Flex align={"center"} justify={"space-between"}>
              <Flex gap={"xl"} align={"center"}>
                <CustomLink to={"/"} preload={false}>
                  <Title order={1} c={"cinkoYellow.7"}>
                    CINKO
                  </Title>
                </CustomLink>

                <CustomLink {...discoverLinkOptions} underline="hover">
                  <Text c={"white"} fw={500}>
                    Discover
                  </Text>
                </CustomLink>
              </Flex>
            </Flex>

            {children}

            <Notifications position="bottom-right" />
          </Container>
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}

{
  /* // function RootComponent() {
//   const { user } = useAuth();

//   const navigate = useNavigate();
//   const field = useField({
//     initialValue: "",
//     validate: (value) =>
//       value.trim().length < 2 ? "Query is too short" : null,
//   });

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();

//     field.validate();

//     navigate({
//       to: "/search",
//       from: "/",
//       search: { query: field.getValue(), page: 1 },
//     });

//     field.setValue("");
//   };

//   const discoverLinkOptions = linkOptions({
//     to: "/discover",
//     from: "/",
//     search: {
//       page: 1,
//       sortBy: "popularity.desc",
//     },
//     preload: false,
//   });

//   return (
//     <Container>
//       <Flex align={"center"} justify={"space-between"}>
//         <Flex gap={"xl"} align={"center"}>
//           <CustomLink to={"/"} preload={false}>
//             <Title order={1} c={"cinkoYellow.7"}>
//               CINKO
//             </Title>
//           </CustomLink>

//           <CustomLink {...discoverLinkOptions} underline="hover">
//             <Text c={"white"} fw={500}>
//               Discover
//             </Text>
//           </CustomLink>
//         </Flex>

//         <form onSubmit={handleSubmit}>
//           <TextInput {...field.getInputProps()} placeholder="Search..." />
//         </form>

//         <Flex gap={"xs"}>
//           {user ? (
//             <>
//               <SignOutButton />

//               <CustomLink
//                 to="/profile/$userId"
//                 params={{ userId: user.id }}
//                 from="/"
//                 preload={false}
//               >
//                 <Button color="cinkoBlue" variant="light">
//                   Profile
//                 </Button>
//               </CustomLink>
//             </>
//           ) : (
//             <>
//               <SignUpButton />

//               <SignInButton />
//             </>
//           )}
//         </Flex>
//       </Flex>

//       <Notifications position="bottom-right" />

//       <Outlet />
//       <ReactQueryDevtools buttonPosition="bottom-left" />
//       <TanStackRouterDevtools position="bottom-right" />
//     </Container>
//   );
// } */
}
