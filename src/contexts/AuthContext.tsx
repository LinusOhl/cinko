import type { Session } from "@supabase/supabase-js";
import { createContext, type ReactNode, useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import {
  signInWithEmail,
  signOut,
  signUpWithEmail,
} from "../features/auth/services/auth.service";
import type {
  AuthContext as AuthContextType,
  Profile,
} from "../features/auth/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error loading profile:", error);
      return;
    }

    setProfile(data);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Leave as is!
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (session?.user) {
        loadProfile(session.user.id);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = async (
    email: string,
    password: string,
    username: string,
  ) => {
    await signUpWithEmail(email, password, username);
  };

  const handleSignIn = async (email: string, password: string) => {
    await signInWithEmail(email, password);
  };

  const handleSignOut = async () => {
    await signOut();
    setProfile(null);
  };

  const value: AuthContextType = {
    user: session?.user ?? null,
    session,
    profile,
    handleSignUp,
    handleSignIn,
    handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
