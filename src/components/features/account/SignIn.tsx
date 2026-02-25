import {
  Alert,
  Button,
  Divider,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertHexagon } from "@tabler/icons-react";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";

export const SignInButton = () => {
  const [error, setError] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleEmailSignIn = async () => {
    const { email, password } = form.getValues();

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
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
        onError: ({ error }) => setError(error.message),
      },
    );
  };

  return (
    <>
      <Button color="cinkoBlue" variant="subtle" onClick={open}>
        Sign in
      </Button>

      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          setError(null);
          close();
        }}
        title="Sign in"
      >
        <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>

        <Divider label="or" />

        <form onSubmit={form.onSubmit(handleEmailSignIn)}>
          <Stack gap={"xs"}>
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
              Sign in
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
