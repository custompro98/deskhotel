import { authentication } from "@/lib/authentication";

export default async function Home() {
  const session = await authentication();

  if (!session) {
    return <div>Logged out</div>;
  }

  return <div>Logged in {session.user.email}</div>;
}
