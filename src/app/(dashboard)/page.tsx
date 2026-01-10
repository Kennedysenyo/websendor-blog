import { CardGrid } from "@/components/home/card-grid";
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
    <div className="h-full flex flex-col overflow-y-auto p-4">
      <HomeHeader name={user?.name!} />
      <hr />
      <CardGrid />
    </div>
  );
}
