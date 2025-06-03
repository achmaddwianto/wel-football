import { IoLogoGoogle } from "react-icons/io5";

export const GoogleButton = () => {
  return (
    <form action="">
      <button
        type="submit"
        className="flex items-center justify-center gap-2 py-2.5 rounded uppercase hover:bg-gray-200 w-full border border-gray-200"
      >
        <IoLogoGoogle />
        Masuk dengan Google
      </button>
    </form>
  );
};
