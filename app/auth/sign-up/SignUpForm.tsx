"use client";
import { useFormState, useFormStatus } from "react-dom";
import { signUpHandler } from "@/lib/api/signUp";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex w-full justify-center rounded-md bg-header px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      type="submit"
      disabled={pending}
    >
      Реєстрація
    </button>
  );
}

export default function Form() {
  const [state, formAction] = useFormState(signUpHandler, null);

  return (
    <form
      className=" flex flex-col items-center justify-center gap-4"
      action={formAction}
    >
      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="username"
        placeholder="Введіть ім'я користувача"
        required
      />
      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="email"
        name="email"
        placeholder="example@gmail.com"
        required
      />
      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="password"
        name="password"
        placeholder="password"
        required
      />
      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="password"
        name="password_confirm"
        placeholder="confirm password"
        required
      />
      <SubmitButton />
      {state?.message && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Помилка! </strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}
    </form>
  );
}
