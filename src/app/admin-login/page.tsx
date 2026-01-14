"use client";

import { authenticate } from "@/lib/loginAction";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

export default function LoginPage() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        action={formAction}
        className="p-8 bg-white shadow-md rounded-lg flex flex-col gap-4 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            name="userName"
            type="text"
            required
            className="w-full border p-2 rounded mt-1 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full border p-2 rounded mt-1 text-black"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
        )}
        <LoginButton />
      </form>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}