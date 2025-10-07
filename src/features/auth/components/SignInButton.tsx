import { Alert, Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { AuthError } from "@supabase/supabase-js";
import { IconAlertHexagon } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const SignInButton = () => {
  const { handleSignIn } = useAuth();

  const [error, setError] = useState<AuthError | null>(null);
  const [opened, { open, close }] = useDisclosure();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    const { email, password } = form.getValues();

    try {
      await handleSignIn(email, password);

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
        title="Sign in"
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
            key={form.key("password")}
            label="Password"
            type="password"
            {...form.getInputProps("password")}
            mt={"sm"}
          />

          {error && (
            <Alert
              title={"Error!"}
              variant="light"
              color="cinkoRed"
              icon={<IconAlertHexagon />}
              mt={"md"}
            >
              {error.message}
            </Alert>
          )}

          <Group justify="flex-end" mt={"sm"}>
            <Button color="cinkoBlue" type="submit">
              Sign in
            </Button>
          </Group>
        </form>
      </Modal>

      <Button color="cinkoBlue" variant="subtle" onClick={open}>
        Sign in
      </Button>
    </>
  );
};
