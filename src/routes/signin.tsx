import {
  Alert,
  Button,
  Card,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandGoogle, IconExclamationCircle } from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CustomLink } from "~/components/CustomLink";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleEmailSignIn = async (email: string, password: string) => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => navigate({ to: "/" }),
        onError: ({ error }) => setError(error.message),
      },
    );
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onSuccess: () => navigate({ to: "/" }),
        onError: ({ error }) => setError(error.message),
      },
    );
  };

  return (
    <Stack h={"100vh"} p={"xs"} gap={"xl"} justify="center">
      <Title order={1} fz={96} styles={{ root: { textAlign: "center" } }}>
        CINKO
      </Title>

      <Stack gap={"xs"}>
        <Group justify="space-between">
          <Text fw={500} fz={24}>
            Sign in
          </Text>

          <CustomLink c={"cinkoYellow"} to="/signup">
            Need an account?
          </CustomLink>
        </Group>

        <Card p={"lg"} radius={"md"} shadow="md" withBorder>
          <Stack gap={"md"}>
            <Button
              variant="light"
              color="cinkoBlue"
              leftSection={<IconBrandGoogle size={18} />}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>

            <Divider label="or" />

            {error && (
              <Alert
                title="Error"
                variant="light"
                color="red"
                radius={"md"}
                icon={<IconExclamationCircle size={18} />}
              >
                {error}
              </Alert>
            )}

            <form
              onSubmit={form.onSubmit((values) =>
                handleEmailSignIn(values.email, values.password),
              )}
            >
              <Stack gap={"sm"}>
                <TextInput
                  key={form.key("email")}
                  label="Email"
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  key={form.key("password")}
                  label="Password"
                  {...form.getInputProps("password")}
                />

                <Button type="submit" color="cinkoBlue" fullWidth>
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
