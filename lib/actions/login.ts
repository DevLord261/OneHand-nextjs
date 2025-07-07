"use server";

import { cookies } from "next/headers";
import { FormState, LoginFormSchema } from "../definitions";
import { redirect, RedirectType } from "next/navigation";

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    userName: formData.get("userName"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    body: formData,
  });

  const token = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("token", token.token);

  redirect("/");
}
