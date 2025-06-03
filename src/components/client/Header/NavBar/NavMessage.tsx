"use client";

import "./NavBar.css";
import { MdOutlineMail } from "react-icons/md";

const NavMessage = () => {
  return (
    <li className="relative">
      <button
        type="button"
        className="flex items-center justify-center w-10 h-10 text-sm hover:bg-gray-200 rounded-full transition-all cursor-pointer"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only ">View message</span>

        <MdOutlineMail size={25} />
      </button>
    </li>
  );
};

export default NavMessage;
