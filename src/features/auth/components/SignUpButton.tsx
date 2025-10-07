import { Alert, Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { AuthError } from "@supabase/supabase-js";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const SignUpButton = () => {
  const { handleSignUp } = useAuth();

  const [error, setError] = useState<AuthError | null>(null);
  const [opened, { open, close }] = useDisclosure();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        value.length < 4 ? "Username must have at least 4 characters" : null,
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
    },
  });

  const handleSubmit = async () => {
    const { email, username, password } = form.getValues();

    try {
      await handleSignUp(email, password, username);

      form.reset();
      close();
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        notifications.show({
          title: "Error",
          message: error.message,
          color: "cinkoRed",
        });

        setError(error);
      }
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          setError(null);
          close();
        }}
        title="Sign up"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            key={form.key("email")}
            label="Email"
            type="email"
            placeholder="john@email.com"
            {...form.getInputProps("email")}
          />

          <TextInput
            key={form.key("username")}
            label="Username"
            type="text"
            placeholder="johndoe"
            {...form.getInputProps("username")}
            mt={"sm"}
          />

          <TextInput
            key={form.key("password")}
            label="Password"
            type="password"
            {...form.getInputProps("password")}
            mt={"sm"}
          />

          {error && (
            <Alert title={"Error!"} variant="light" color="cinkoRed" mt={"md"}>
              {error.message}
            </Alert>
          )}

          <Group justify="flex-end" mt={"sm"}>
            <Button color="cinkoBlue" type="submit">
              Sign up
            </Button>
          </Group>
        </form>
      </Modal>

      <Button color="cinkoYellow" variant="subtle" onClick={open}>
        Sign up
      </Button>
    </>
  );
};
