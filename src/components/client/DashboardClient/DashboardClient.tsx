"use client";

type UserProps = {
  name: string;
  email: string;
};

type DashboardClientProps = {
  user: UserProps;
};

const DashboardClient = ({ user }: DashboardClientProps) => {
  return (
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      <h1 className="text-2xl">Dashboard</h1>
      <h2 className="text-xl">
        Selamat Datang: <span className="font-bold">{user.name}</span>
      </h2>
      <p className="text-sm text-gray-500">Email: {user.email}</p>
    </div>
  );
};

export default DashboardClient;
