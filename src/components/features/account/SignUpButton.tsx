import {
  Alert,
  Button,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertHexagon } from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import z from "zod";
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

export const SignUpButton = () => {
  const [error, setError] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zod4Resolver(SignUpSchema),
  });

  const handleSignUp = async () => {
    const { username, email, password } = form.getValues();

    await authClient.signUp.email(
      {
        name: username,
        email,
        password,
      },
      {
        onError: ({ error }) => setError(error.message),
      },
    );
  };

  return (
    <>
      <Modal
        title="Sign up"
        opened={opened}
        onClose={() => {
          form.reset();
          setError(null);
          close();
        }}
      >
        <form onSubmit={form.onSubmit(handleSignUp)}>
          <Stack gap={"xs"}>
            <TextInput
              key={form.key("email")}
              label="Email"
              {...form.getInputProps("email")}
            />

            <TextInput
              key={form.key("username")}
              label="Username"
              {...form.getInputProps("username")}
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

            {error && (
              <Alert
                title={"Error!"}
                variant="light"
                color="cinkoRed"
                icon={<IconAlertHexagon />}
              >
                {error}
              </Alert>
            )}

            <Button color="cinkoBlue" type="submit" fullWidth>
              Sign up
            </Button>
          </Stack>
        </form>
      </Modal>

      <Button color="cinkoYellow" variant="subtle" onClick={open}>
        Sign up
      </Button>
    </>
  );
};
