"use client";

import { FaLock } from "react-icons/fa";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-600 text-white text-center px-4">
      <FaLock className="text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">Unauthorized Access</h1>
      <p className="text-lg mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        href="/"
        className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
      >
        Login Again
      </Link>
    </div>
  );
}
