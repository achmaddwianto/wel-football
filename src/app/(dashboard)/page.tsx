import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <div className="space-y-4 p-8 pt-5 rounded border-2 border-gray-900/10">
      <h1 className="text-2xl">Dashboard</h1>
      {isLoggedIn && (
        <>
          <p className="text-xl mb-2">
            {" "}
            Welcome Back :{" "}
            <span className="font-bold">
              {session?.user?.name || session?.user?.email}!
            </span>
          </p>
        </>
      )}
    </div>
  );
}
