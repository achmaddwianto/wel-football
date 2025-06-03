"use client";

import { useMemo, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { IconType } from "react-icons";
import { usePathname, useRouter } from "next/navigation";
import SideSubMenuItem from "../SideMenuSubItem";

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

const SideMenuItem = ({ item }: { item: ISideMenuItem }) => {
  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (items && items.length > 0) {
      return setExpanded(!expanded);
    }

    return router.push(path);
  };

  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      if (items.find((item) => item.path === pathname)) {
        setExpanded(true);
        return true;
      }
    }

    return path === pathname;
  }, [items, path, pathname]);

  return (
    <>
      <div
        className={`flex items-center p-3 rounded-sm hover:bg-gray-100 cursor-pointer hover:text-gray-950 justify-between ${
          isActive && "outline border-.5 border-black"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          <Icon size={24} />
          <p className="text-base font-normal ml-2.5">{name} </p>
        </div>
        {items && items.length > 0 && (
          <MdKeyboardArrowDown
            size={20}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        )}
      </div>
      {expanded && items && items.length > 0 && (
        <div className="flex flex-col space-y-1 ml-10">
          {items.map((item) => (
            <SideSubMenuItem key={item.path} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SideMenuItem;
