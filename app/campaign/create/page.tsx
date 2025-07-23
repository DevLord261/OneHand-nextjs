import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Index from "./CreatePage";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/auth");

  return <Index />;
}
