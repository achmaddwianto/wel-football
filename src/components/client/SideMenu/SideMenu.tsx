"use client";

import "./SideMenu.css";
import type { IconType } from "react-icons";
import type { User } from "next-auth";
import {
  MdOutlineHome,
  MdOutlineAccountBalanceWallet,
  MdSettings,
  MdOutlineGroup,
  MdOutlineInventory2,
  MdOutlineShoppingCart,
} from "react-icons/md";
import SideMenuItem from "./SideMenuItem";

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

interface SideMenuProps {
  user?: User;
}

const items: ISideMenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: MdOutlineHome,
  },

  {
    name: "Produk",
    path: "/products",
    icon: MdOutlineInventory2,
  },
  {
    name: "Pesanan",
    path: "/transaksi",
    icon: MdOutlineShoppingCart,
  },
  {
    name: "Laporan Keuangan",
    path: "/finance",
    icon: MdOutlineAccountBalanceWallet,
    items: [
      {
        name: "Aktivitas",
        path: "/finance/activity_finance",
      },
      {
        name: "Analisis",
        path: "/finance/analytics_finance",
      },
      {
        name: "Laporan",
        path: "/finance/report_finance",
      },
      {
        name: "Pendapatan",
        path: "/transaksi/revenue",
      },
      {
        name: "Keuntungan",
        path: "/transaksi/profit",
      },
    ],
  },

  {
    name: "Pelanggan",
    path: "/customers",
    icon: MdOutlineGroup,
  },

  {
    name: "Pengaturan",
    path: "/settings",
    icon: MdSettings,
  },
];

const SideMenu = ({ user }: SideMenuProps) => {
  return (
    <nav id="sidemenu" className="sidemenu">
      <div className="flex flex-col space-y-10 w-full">
        {user && (
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-medium text-sm">{user.name || user.email}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SideMenuItem key={index} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SideMenu;
