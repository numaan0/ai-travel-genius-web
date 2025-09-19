// src/components/layout/Header.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <motion.header
      className="sticky top-0 z-50 antialiased  bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-md shadow-sm border-b border-gray-100"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-white hover:transition">
          AI Travel Genius
        </Link>

        <nav className="flex items-center gap-5">
          {status === "loading" ? (
            <span className="text-gray-500">Loading...</span>
          ) : session ? (
            <>
              <span className="text-gray-700">
                👋 Hi, <span className="font-semibold">{session.user?.name}</span>
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-1.5 bg-red-500 text-white rounded-2xl shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
