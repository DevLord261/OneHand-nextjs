"use server";

import { redirect } from "next/navigation";
import { FormState, RegisterFormSchema } from "../definitions";

export async function Register(state: FormState, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    firstName: formData.get("Firstname"),
    lastName: formData.get("Lastname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch("http://localhost:8080/api/users/create", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(validatedFields.data),
  });

  if (!res.ok) {
    console.error("user already exists");
  }

  redirect("/auth");
}
