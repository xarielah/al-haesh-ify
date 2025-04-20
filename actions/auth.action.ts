"use server";

import { signIn, signOut } from "@/auth";

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

export async function signInGoogleUser() {
  await signIn("google");
}
