import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AuthError } from "@supabase/supabase-js";
import { useAuth } from "../hooks/useAuth";

export const SignOutButton = () => {
  const { handleSignOut } = useAuth();

  const handleAction = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      if (error instanceof AuthError) {
        notifications.show({
          title: "Error",
          message: error.message,
          color: "cinkoRed",
        });
      }
    }
  };

  return (
    <Button color="cinkoRed" variant="subtle" onClick={() => handleAction()}>
      Sign out
    </Button>
  );
};
