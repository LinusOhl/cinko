import {
  Alert,
  Button,
  Card,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import { CustomLink } from "~/components/CustomLink";
import { authClient } from "~/lib/auth-client";

const SignUpSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (values) => {
      return values.confirmPassword === values.password;
    },
    {
      error: "Passwords does not match.",
      path: ["confirmPassword"],
    },
  );

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: schemaResolver(SignUpSchema, { sync: true }),
  });

  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
  ) => {
    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: ({ error }) => setError(error.message),
        onSuccess: () => navigate({ to: "/" }),
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
            Sign up
          </Text>

          <CustomLink to="/signin" c={"cinkoYellow"}>
            Already have an account?
          </CustomLink>
        </Group>

        <Card p={"lg"} radius={"md"} shadow="md" withBorder>
          <Stack gap={"md"}>
            {error && (
              <Alert title="Error" color="cinkoRed" radius={"sm"}>
                {error}
              </Alert>
            )}

            <form
              onSubmit={form.onSubmit((values) =>
                handleSignUp(values.name, values.email, values.password),
              )}
            >
              <Stack gap={"sm"}>
                <TextInput
                  key={form.key("name")}
                  label="Name"
                  {...form.getInputProps("name")}
                />

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

                <PasswordInput
                  key={form.key("confirmPassword")}
                  label="Confirm password"
                  {...form.getInputProps("confirmPassword")}
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
