"use server";

import { organizer } from "@/types/campaign";
import { cookies } from "next/headers";

export async function getUserProfile(): Promise<organizer | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const res = await fetch("http://localhost:8080/api/users/Getuser", {
      // 🔐 Include cookies to carry session/JWT if needed
      credentials: "include",
      cache: "no-store", // Optional: disable caching
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}
