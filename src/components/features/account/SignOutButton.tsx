import { Button } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";

export const SignOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authClient.signOut(
      {},
      {
        onSuccess: () => navigate({ to: "/" }),
      },
    );
  };

  return (
    <Button color="cinkoRed" variant="subtle" onClick={handleLogout}>
      Sign out
    </Button>
  );
};
