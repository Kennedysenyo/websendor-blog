import { HomeHeader } from "@/components/home/header";
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
    <div className=" min-h-full">
      <HomeHeader name={user?.name!} />
    </div>
  );
}
