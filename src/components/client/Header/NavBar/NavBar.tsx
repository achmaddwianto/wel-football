// "use client";

import React from "react";
import NavNotice from "./NavNotice";
import NavMessage from "./NavMessage";
import "./NavBar.css";
import Link from "next/link";
import { LuBadgePlus, LuLogOut } from "react-icons/lu";
import { signOut, signIn } from "../../../../../auth";
import Image from "next/image";

const NavBar = ({ session }: { session: any }) => {
  return (
    <>
      <nav className="navBar ms-auto">
        <ul className="flex items-center">
          {/* <SearchBarToggle /> */}
          <NavNotice />
          <NavMessage />
          <li>
            <div className="relative text-black mr-5">
              {session && session?.user ? (
                <>
                  <Link href="/startup/create">
                    <span className="max-sm:hidden">Create</span>
                    <LuBadgePlus className="size-6 sm:hidden" />
                  </Link>

                  <form
                    action={async () => {
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <button type="submit">
                      <span className="max-sm:hidden">Logout</span>
                      <LuLogOut className="size-6 sm:hidden text-red-500" />
                    </button>
                  </form>

                  <Link href={`/user/${session?.id}`}>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || ""}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-white font-semibold">
                        AV
                      </div>
                    </div>
                  </Link>
                </>
              ) : (
                <form
                  action={async () => {
                    await signIn("github");
                  }}
                >
                  <button type="submit">Login</button>
                </form>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
