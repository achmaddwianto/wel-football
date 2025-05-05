"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpCredentials } from "@/lib/actions";
import { RegisterButton } from "@/components/client/Button/Button";

const FormRegister = () => {
  const [state, formAction] = useActionState(signUpCredentials, null);
  return (
    <form action={formAction} className="space-y-6">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded bg-red-100"
          role="alert"
        >
          <span>{state?.message}</span>
        </div>
      ) : null}

      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Alexander"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.name}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="alexander@gmail.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="********"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="ConfirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Konfirmasi Password
        </label>
        <input
          type="password"
          name="ConfirmPassword"
          placeholder="********"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.ConfirmPassword}
          </span>
        </div>
      </div>
      <RegisterButton />
      <p className="text-sm font-light text-gray-500">
        Already have an account?
        <Link href="/login">
          <span className="font-medium pl-1 text-blue-600 hover:text-blue-700">
            Sign In
          </span>
        </Link>
      </p>
    </form>
  );
};

export default FormRegister;
