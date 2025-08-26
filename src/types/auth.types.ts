import type { Session, User } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  username: string | null;
};

export type AuthContext = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};
