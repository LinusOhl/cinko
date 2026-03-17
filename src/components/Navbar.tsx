import { Button, Divider, Group } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { CustomLink } from "./CustomLink";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Group p={"xs"} justify="space-between">
        <CustomLink to="/" c={"white"} fz={"h1"} fw={700}>
          CINKO
        </CustomLink>

        <Group>
          <Button
            variant="light"
            color="cinkoBlue"
            onClick={() => navigate({ to: "/signin" })}
          >
            Sign in
          </Button>
          <Button color="cinkoBlue" onClick={() => navigate({ to: "/signup" })}>
            Sign up
          </Button>
        </Group>
      </Group>

      <Divider data-breakout />
    </>
  );
};
