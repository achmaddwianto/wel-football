"use client";

import * as React from "react";
import Logo from "../../Logo";
// import SearchBar from "../SearchBar";
// import "@/styles/global.css";
import "./Header.css";
import NavBar from "./NavBar";
import { useIsScrolled } from "@/hooks/useIsScrolled";

const Header = () => {
  const isScrolled = useIsScrolled();

  return (
    <header
      id="header"
      className={`header fixed top-0 right-0 left-0 flex items-center transition-all duration-300 bg-white ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <Logo />
      {/* <SearchBar /> */}
      <NavBar session={undefined} />
    </header>
  );
};
export default Header;
