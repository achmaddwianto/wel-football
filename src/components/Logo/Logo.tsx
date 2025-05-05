import React from "react";
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
        className="toggle-sidemenu-btn toggle-sidebar mr-5 text-2xl cursor-pointer"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="32px"
          fill="#434343"
          cursor="pointer"
          className="font-light"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg> */}
        <AiOutlineMenu />
      </button>
      <Link href="/" className="leading-none flex items-center no-underline ">
        {/* <AdbIcon
          sx={{ display: { xs: "none", md: "flex" }, mr: 1, ml: 1, mb: 0.1 }}
          className="icon"
        /> */}
        <span className="d-lg-block no-underline text-[27px] font-semibold font-mono text-[#434343]">
          WellFootball
        </span>
        {/* <Image
          src="/logowelfootball.png"
          alt="logo"
          width={100}
          height={20}
          
        /> */}
      </Link>
    </div>
  );
};

export default Logo;
