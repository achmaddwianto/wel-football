"use client";

import "./PublicSideMenu.css";
import type { IconType } from "react-icons";
import type { User } from "next-auth";
import {
  MdOutlineHome,
  MdOutlineAccountBalanceWallet,
  MdOutlineInventory2,
  MdOutlineShoppingCart,
  MdOutlinePeople,
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

interface PublicSideMenuProps {
  user?: User;
}

// Menu khusus untuk public
const publicItems: ISideMenuItem[] = [
  {
    name: "Home",
    path: "/home",
    icon: MdOutlineHome,
  },
  {
    name: "Sepatu",
    path: "/admin/products",
    icon: MdOutlineInventory2,
  },
  {
    name: "Jersey",
    path: "/admin/orders",
    icon: MdOutlineShoppingCart,
  },
  {
    name: "Brand",
    path: "/admin/finance",
    icon: MdOutlineAccountBalanceWallet,
    items: [
      {
        name: "Adidas",
        path: "/admin/finance/activity",
      },
      {
        name: "Nike",
        path: "/admin/finance/analytics",
      },
      {
        name: "Specs",
        path: "/admin/finance/report",
      },
      {
        name: "Puma",
        path: "/admin/finance/revenue",
      },
      {
        name: "Mizuno",
        path: "/admin/finance/profit",
      },
      {
        name: "Ortuseight",
        path: "/admin/finance/profit",
      },
    ],
  },
  {
    name: "Sale",
    path: "/admin/customers",
    icon: MdOutlinePeople,
  },
];

const PublicSideMenu = ({ user }: PublicSideMenuProps) => {
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
          {publicItems.map((item, index) => (
            <SideMenuItem key={index} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default PublicSideMenu;
