"use client";

import "./AdminSideMenu.css";
import type { IconType } from "react-icons";
import type { User } from "next-auth";
import {
  MdOutlineHome,
  MdOutlineAccountBalanceWallet,
  MdOutlineSettings,
  MdOutlineInventory2,
  MdOutlineShoppingCart,
  MdOutlineAnalytics,
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

interface AdminSideMenuProps {
  user?: User;
}

// Menu khusus untuk admin
const adminItems: ISideMenuItem[] = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: MdOutlineHome,
  },
  {
    name: "Produk",
    path: "/admin/product",
    icon: MdOutlineInventory2,
  },
  {
    name: "Pesanan",
    path: "/admin/orders",
    icon: MdOutlineShoppingCart,
  },
  {
    name: "Laporan Keuangan",
    path: "/admin/finance",
    icon: MdOutlineAccountBalanceWallet,
    items: [
      {
        name: "Aktivitas",
        path: "/admin/finance/activity",
      },
      {
        name: "Analisis",
        path: "/admin/finance/analytics",
      },
      {
        name: "Laporan",
        path: "/admin/finance/report",
      },
      {
        name: "Pendapatan",
        path: "/admin/finance/revenue",
      },
      {
        name: "Keuntungan",
        path: "/admin/finance/profit",
      },
    ],
  },
  {
    name: "Pelanggan",
    path: "/admin/customers",
    icon: MdOutlinePeople,
  },
  {
    name: "Analitik",
    path: "/admin/analytics",
    icon: MdOutlineAnalytics,
  },
  {
    name: "Pengaturan",
    path: "/admin/settings",
    icon: MdOutlineSettings,
  },
];

const AdminSideMenu = ({ user }: AdminSideMenuProps) => {
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
          {adminItems.map((item, index) => (
            <SideMenuItem key={index} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AdminSideMenu;
