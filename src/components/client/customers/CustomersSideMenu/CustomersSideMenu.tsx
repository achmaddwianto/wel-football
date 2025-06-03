"use client";

import "./CustomersSideMenu.css";
import type { IconType } from "react-icons";
import type { User } from "next-auth";
import {
  MdOutlineHome,
  MdOutlineShoppingCart,
  MdOutlineShoppingBag,
  MdOutlineFavoriteBorder,
  MdOutlineAccountCircle,
  MdOutlineLocalShipping,
  MdOutlineSettings,
} from "react-icons/md";
import SideMenuItem from "@/components/client/SideMenu/SideMenuItem";

interface ISideMenuItem {
  name: string;
  path: string;
  icon: IconType;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

interface CustomerSideMenuProps {
  user?: User;
}

// Menu khusus untuk customer
const customerItems: ISideMenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: MdOutlineHome,
  },
  {
    name: "Pesanan Saya",
    path: "/orders",
    icon: MdOutlineShoppingBag,
  },
  {
    name: "Keranjang",
    path: "/cart",
    icon: MdOutlineShoppingCart,
  },
  {
    name: "Favorit",
    path: "/wishlist",
    icon: MdOutlineFavoriteBorder,
  },
  {
    name: "Status Pengiriman",
    path: "/shipping",
    icon: MdOutlineLocalShipping,
  },
  {
    name: "Profil",
    path: "/profile",
    icon: MdOutlineAccountCircle,
  },
  {
    name: "Pengaturan",
    path: "/settings",
    icon: MdOutlineSettings,
  },
];

const CustomerSideMenu = ({ user }: CustomerSideMenuProps) => {
  return (
    <nav id="sidemenu" className="sidemenu">
      <div className="flex flex-col space-y-10 w-full">
        {/* Info user */}
        {user && (
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-medium text-sm">{user.name || user.email}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          {customerItems.map((item, index) => (
            <SideMenuItem key={index} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CustomerSideMenu;
