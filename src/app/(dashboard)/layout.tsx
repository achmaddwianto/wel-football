import Header from "@/components/client/Header";
import { SessionProvider } from "next-auth/react";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SessionProvider>
      <main className="font-work-sans">
        <Header />
        {children}
      </main>
    </SessionProvider>
  );
};

export default HomeLayout;
