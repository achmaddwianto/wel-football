import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface ISubItem {
  name: string;
  path: string;
}

const SideSubMenuItem = ({ item }: { item: ISubItem }) => {
  const { name, path } = item;
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    return router.push(path);
  };

  const isActive = useMemo(() => path === pathname, [path, pathname]);

  return (
    <>
      <div
        className={`flex items-center p-3 rounded hover:bg-gray-100 cursor-pointer hover:text-gray-950 justify-between ${isActive && "outline border-.5 border-black"}`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          <p className="text-base font-normal ml-2.5">{name}</p>
        </div>
      </div>
    </>
  );
};

export default SideSubMenuItem;
