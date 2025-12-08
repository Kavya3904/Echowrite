// src/app/layout.tsx
"use client";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { IoMdArrowDropdown } from "@react-icons/all-files/io/IoMdArrowDropdown";
import { IoIosMenu } from "@react-icons/all-files/io/IoIosMenu";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  function toggleMobileMenu() {
    console.log("setmenu", isMenuOpen);
    setMenuOpen(!isMenuOpen);
  }
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-950 text-slate-100 flex flex-col">
        <header className="border-b border-[#CCBEB1] text-[#664C36]">
          <nav className="mx-auto flex h-16  max-w-5xl items-center justify-between  p-4">
            <Link className="text-lg  font-bold" href="/">
              Echo Write
            </Link>
            <div className=" hidden md:flex text-sm items-center flex gap-4 ">
              <Link className="hover:underline " href="/blog">
                Blog
              </Link>
              <Link className="hover:underline " href="/dashboard">
                Dashboard
              </Link>
              <div className=" cursor-pointer relative group flex text-slate-500 ">
                <p className="flex flex-row items-center gap-1 group-hover:text-slate-800">
                  <span>User</span>
                  <IoMdArrowDropdown className=" rotate-180 transition-all group-hover:rotate-0 " />
                </p>
                <div className="absolute   flex flex-col shadow-lg gap-2 w-auto rounded-lg right-3 top-5 hidden  bg-slate-100 transition-all  group-hover:flex">
                  <Link
                    href="/login"
                    className="hover:bg-slate-300 rounded-t-lg text-sm  text-[#664C36]  pr-6 pl-4 pb-2 pt-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signin"
                    className="hover:bg-slate-300 rounded-b-lg text-sm  text-[#664C36] pr-6 pl-4 pb-2 pt-2"
                  >
                    SignIn
                  </Link>
                </div>
              </div>
            </div>
            <div onClick={toggleMobileMenu} className="md:hidden">
              <IoIosMenu className="md:hidden flex text-lg" />
            </div>
          </nav>

          <MobileMenubar
            toggleMenu={toggleMobileMenu}
            isMenuOpen={isMenuOpen}
          />
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-slate-800">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 text-xs text-slate-400">
            <span>© {new Date().getFullYear()} EchoWrite</span>
            <span>Built with Next.js & Tailwind</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

function MobileMenubar({ toggleMenu, isMenuOpen }: any) {
  const [isUserOpen, setUserOpen] = useState(false);

  function toggleUserOpen() {
    setUserOpen(!isUserOpen);
  }

  return (
    <div
      className={`
        md:hidden fixed inset-0 flex justify-end bg-black/40
        transition-opacity duration-500
        ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      {/* Sliding panel */}
      <div
        className={`
          bg-white w-3/4 h-full px-2 py-2
          transform transition-transform duration-500
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="text-2xl p-2 flex justify-end text-slate-800">
          <button onClick={toggleMenu}>
            <IoMdClose />
          </button>
        </div>

        <div className="flex flex-col text-sm p-4 mt-2 gap-6">
          <Link className="hover:underline" href="/blog">
            Blog
          </Link>
          <Link className="hover:underline" href="/dashboard">
            Dashboard
          </Link>

          <div
            className="cursor-pointer flex flex-col text-slate-500"
            onClick={toggleUserOpen}
          >
            <p className="flex flex-row items-center gap-1">
              <span>User</span>
              <IoMdArrowDropdown
                className={`transition-all  ${isUserOpen ? "rotate-180" : ""}`}
              />
            </p>

            <div
              className={`
    flex flex-col shadow-lg gap-2 w-auto rounded-lg bg-slate-100 mt-2
    transition-all duration-300 transform 

    ${
      isUserOpen
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-2 pointer-events-none"
    }
  `}
            >
              <Link
                href="/login"
                className="hover:bg-slate-300 rounded-t-lg text-sm text-[#664C36] pr-6 pl-4 pb-2 pt-2"
              >
                Login
              </Link>
              <Link
                href="/signin"
                className="hover:bg-slate-300 rounded-b-lg text-sm text-[#664C36] pr-6 pl-4 pb-2 pt-2"
              >
                SignIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
