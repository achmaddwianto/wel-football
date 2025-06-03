import { auth } from "@/auth";
import Link from "next/link";

export default async function HeroSection() {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        Selamat Datang di Wel Football
      </h1>
      <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
        Temukan produk brand terbaik di dunia dengan harga menarik
      </p>
      <div className="mt-8 flex justify-center">
        {user ? (
          <Link
            href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
            className="hover:bg-gray-300 px-6 py-3 rounded-full font-semibold"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="ml-4 inline-flex items-center justify-center px-5 py-1 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
