import { auth } from "../../../../auth";

const Home = async () => {
  const session = await auth();
  return (
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      <h1 className="text-2xl">Home</h1>
      <h2>
        Welcome Back : <span className="font-bold">{session?.user?.name}</span>
      </h2>
    </div>
  );
};

export default Home;
