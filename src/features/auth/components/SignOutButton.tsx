import { Button } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";

export const SignOutButton = () => {
  const { handleSignOut } = useAuth();

  return (
    <Button color="cinkoRed" variant="subtle" onClick={() => handleSignOut()}>
      Sign out
    </Button>
  );
};
