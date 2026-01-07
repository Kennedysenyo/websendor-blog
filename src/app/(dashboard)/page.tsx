import LogOutButton from "@/components/logout-button";
import { requireSession } from "@/lib/better-auth/server-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  let user;
  const session = await requireSession();
  if (session) {
    user = session.user;
  }
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-full">
      <p>Welcome {user?.name}</p>
      <LogOutButton />
    </div>
  );
}
