"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { name: error.name, code: error.code };
  }
  
  redirect("/admin");
};

export const logout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { name: error.name, code: error.code };
  }

  redirect('/')
  // return null;
};
