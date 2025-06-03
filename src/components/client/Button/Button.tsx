"use client";

import { useFormStatus } from "react-dom";

export const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white bg-blue-700 font-medium rounded px-5 py-2.5 text-center uppercase hover:bg-blue-800"
    >
      {pending ? "Mengautentikasi..." : "Masuk"}
    </button>
  );
};

export const RegisterButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white bg-blue-700 font-medium rounded px-5 py-2.5 text-center uppercase hover:bg-blue-800"
    >
      {pending ? "Mendaftar..." : "Daftar"}
    </button>
  );
};

export const AddProductButton = () => {
  return (
    <button
      id="add-product-button"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
      Tambah Produk
    </button>
  );
};
