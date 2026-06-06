"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";

export async function login(formData: FormData) {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL === "https://dummy.supabase.co" || 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "dummy_key_replace_me") {
    return { error: "Please configure real Supabase credentials in your .env file." };
  }

  const supabase = await createClient();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL === "https://dummy.supabase.co" || 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "dummy_key_replace_me") {
    return { error: "Please configure real Supabase credentials in your .env file." };
  }

  const supabase = await createClient();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
