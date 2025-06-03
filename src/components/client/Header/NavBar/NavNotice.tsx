"use client";

import { MdNotificationsNone } from "react-icons/md";
import "./NavBar.css";

const NavNotice = () => {
  return (
    <li className="relative">
      <button
        type="button"
        className="flex items-center justify-center w-10 h-10 text-sm hover:bg-gray-200 rounded-full transition-all cursor-pointer"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only ">View notifications</span>
        <MdNotificationsNone size={25} />

        {/* <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/100 ring-inset absolute top-[-10px] right-[-10px] hei">
            5
          </span> */}
      </button>

      {/* <ul
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-gray-950 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <li>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <PencilIcon className="size-4 fill-white/30" />
            Edit
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘E
            </kbd>
          </button>
        </li>
        <li>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <Square2StackIcon className="size-4 fill-white/30" />
            Duplicate
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘D
            </kbd>
          </button>
        </li>

        <li>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
            Archive
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘A
            </kbd>
          </button>
        </li>
        <li>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <TrashIcon className="size-4 fill-white/30" />
            Delete
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘D
            </kbd>
          </button>
        </li>
      </ul> */}

      {/* <ul className="dropdownMenu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-head">
          Kamu memiliki 4 pesan baru belum dibaca
          <Link href="#">
            <span className="badge rounded-pill bg-[primary] p-2 ms-2">
              Lihat semua
            </span>
          </Link>
        </li>
      </ul> */}

      {/* <li>
        <hr className="dropdown-divider" />
      </li>

      <li className="notification-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
        </svg>

        <div>
          <h4>Lorem ipsum </h4>
          <p>
            sit amet consectetur adipisicing elit. Eius atque beatae vitae quam
            dolorum
          </p>
          <p>
            cupiditate dicta similique! Sunt ad molestiae officia mollitia
            aliquam neque eius voluptatibus incidunt, voluptate culpa dolorum?
          </p>
        </div>
      </li>

      <li>
        <hr className="dropdown-divider" />
      </li>

      <li className="notification-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clipRule="evenodd"
          />
        </svg>

        <div>
          <h4>Lorem ipsum </h4>
          <p>
            sit amet consectetur adipisicing elit. Eius atque beatae vitae quam
            dolorum
          </p>
          <p>
            cupiditate dicta similique! Sunt ad molestiae officia mollitia
            aliquam neque eius voluptatibus incidunt, voluptate culpa dolorum?
          </p>
          <p> 1 menit yang lalu</p>
        </div>
      </li> */}
    </li>
  );
};

export default NavNotice;
