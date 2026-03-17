import {
  Button,
  Card,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { CustomLink } from "~/components/CustomLink";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack h={"100vh"} p={"xs"} gap={"xl"} justify="center">
      <Title order={1} fz={96} styles={{ root: { textAlign: "center" } }}>
        CINKO
      </Title>

      <Stack gap={"xs"}>
        <Group justify="space-between">
          <Text fw={500} fz={24}>
            Sign up
          </Text>

          <CustomLink to="/" c={"cinkoYellow"}>
            Already have an account?
          </CustomLink>
        </Group>

        <Card p={"lg"} radius={"md"} shadow="md" withBorder>
          <Stack gap={"md"}>
            <form
            // onSubmit={form.onSubmit((values) =>
            //   handleSignUp(values.name, values.email, values.password),
            // )}
            >
              <Stack gap={"sm"}>
                <TextInput
                  // key={form.key("name")}
                  label="Name"
                  // {...form.getInputProps("name")}
                />

                <TextInput
                  // key={form.key("email")}
                  label="Email"
                  // {...form.getInputProps("email")}
                />

                <PasswordInput
                  // key={form.key("password")}
                  label="Password"
                  // {...form.getInputProps("password")}
                />

                <PasswordInput
                  // key={form.key("confirmPassword")}
                  label="Confirm password"
                  // {...form.getInputProps("confirmPassword")}
                />

                <Button type="submit" color="cinkoBlue" fullWidth>
                  Sign up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
