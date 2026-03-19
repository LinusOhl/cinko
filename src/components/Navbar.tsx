import { Button, Divider, Group } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { CustomLink } from "./CustomLink";

export const Navbar = () => {
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <>
      <Group p={"xs"} justify="space-between">
        <CustomLink to="/" c={"white"} fz={"h1"} fw={700} ff={"heading"}>
          CINKO
        </CustomLink>

        <Group>
          {session ? (
            <Button variant="light" color="cinkoRed" onClick={handleSignOut}>
              Log out
            </Button>
          ) : (
            <>
              <Button
                variant="light"
                color="cinkoBlue"
                onClick={() => navigate({ to: "/signin" })}
              >
                Sign in
              </Button>
              <Button
                color="cinkoBlue"
                onClick={() => navigate({ to: "/signup" })}
              >
                Sign up
              </Button>
            </>
          )}
        </Group>
      </Group>

      <Divider data-breakout />
    </>
  );
};
