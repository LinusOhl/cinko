import type { Session, User } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  username: string | null;
};

export type AuthContext = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  handleSignUp: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
};
