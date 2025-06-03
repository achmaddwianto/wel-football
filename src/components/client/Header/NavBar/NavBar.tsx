import NavNotice from "./NavNotice";
import NavMessage from "./NavMessage";
import "./NavBar.css";
import type { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { MdPerson } from "react-icons/md";

interface NavBarProps {
  user: User | undefined;
  isLoggedIn: boolean;
}

const NavBar = ({ user, isLoggedIn }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navBar ms-auto">
        <ul className="flex items-center gap-3">
          {isLoggedIn && (
            <>
              <NavNotice />
              <NavMessage />
            </>
          )}
          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center text-gray-600 w-8 h-8 mr-5 text-sm ring-gray-200 bg-white rounded-full hover:ring-gray-400 focus:outline-none focus:ring-gray-400 transition-all cursor-pointer"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              {isLoggedIn ? (
                <Image
                  src={user?.image || "/avatar-default.svg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <MdPerson size={25} />
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-5 mt-2 p-1.5 w-auto rounded shadow-lg bg-white ring-1 ring-gray-400 ring-opacity-5 focus:outline-none z-10 py-1 animate-in fade-in duration-200">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-600 text-left capitalize">
                        {user?.name || "Guest"}
                      </p>
                      <p className="text-xs text-gray-400 text-left capitalize">
                        {user?.role || "user"}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut({ callbackUrl: "/login" });
                      }}
                      className="flex items-center text-red-600 cursor-pointer w-full px-4 py-2 rounded text-sm hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-gray-700 px-4 p-2 rounded text-sm hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-gray-700 px-4 p-2 rounded text-sm hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Daftar
                    </Link>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
