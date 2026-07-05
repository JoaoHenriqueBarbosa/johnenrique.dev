"use server";

import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession } from "@/lib/dashboard-auth";

export async function login(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Senha incorreta." };
  }
  await createSession();
  redirect("/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/dashboard/login");
}
