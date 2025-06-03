"use client";

import Link from "next/link";
import "./Logo.css";
import { AiOutlineMenu } from "react-icons/ai";

const Logo = () => {
  const handleToggleSideMenu = () => {
    document.body.classList.toggle("toggle-sidemenu");
  };

  return (
    <div className="flex items-center justify-between sm:text-left">
      <button
        onClick={handleToggleSideMenu}
        className="toggle-sidemenu-btn mr-5 text-2xl cursor-pointer "
        aria-label="Toggle sidemenu"
      >
        <AiOutlineMenu />
      </button>
      <Link href="/" className="leading-none flex items-center no-underline ">
        <span className="d-lg-block no-underline text-[27px] font-semibold font-mono text-[#434343]">
          WelFootball
        </span>
      </Link>
    </div>
  );
};

export default Logo;
