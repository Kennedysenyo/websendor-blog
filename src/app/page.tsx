import LogOutButton from "@/components/logout-button";
import { requireSession } from "@/lib/better-auth/server-auth";

export default async function Home() {
  let user;
  const session = await requireSession();
  if (session) {
    user = session.user;
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-4">
      <p>Welcome {user?.name}</p>
      <LogOutButton />
    </div>
  );
}
