"use server";

import { cookies } from "next/headers";
import { FormState, LoginFormSchema } from "../definitions";
import { redirect } from "next/navigation";

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
  try {
    const res = await fetch("http://localhost:8080/api/users/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      return {
        errors: {
          userName: ["Invalid username or password"],
        },
      };
    }

    const token = await res.json();

    if (!token.token) {
      return {
        errors: {
          userName: ["Login failed - no token received"],
        },
      };
    }
    const cookieStore = await cookies();
    // cookieStore.set("token", token.token);
    cookieStore.set("token", token.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  } catch (e) {
    console.error("Login error:", e);
    return {
      errors: {
        userName: ["Login failed - please try again"],
      },
    };
  }
  redirect("/");
}
