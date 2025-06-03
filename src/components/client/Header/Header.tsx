"use client";

import "./Header.css";
import NavBar from "./NavBar";
import { useIsScrolled } from "@/hooks/useIsScrolled";
import Logo from "./Logo";
import type { User } from "next-auth";

interface HeaderProps {
  user: User | undefined;
  isLoggedIn: boolean;
}

const Header = ({ user, isLoggedIn }: HeaderProps) => {
  const isScrolled = useIsScrolled();

  return (
    <header
      id="header"
      className={`header fixed top-0 right-0 left-0 flex items-center transition-all duration-300 bg-white ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <Logo />
      <NavBar user={user} isLoggedIn={isLoggedIn} />
    </header>
  );
};
export default Header;
