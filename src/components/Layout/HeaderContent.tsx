"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { CloseIcon, MenuIcon } from "./Icons";

interface HeaderContentProps {
  links: { href: string; label: string; icon: React.ReactNode }[];
  logoutButton?: React.ReactNode;
  isAuthenticated: boolean;
}

export default function HeaderContent({
  links,
  logoutButton,
  isAuthenticated,
}: HeaderContentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="font-sm fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-lg shadow-gray-500/30">
      <div className="z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain h-10 w-auto"
                priority
              />
            </Link>
          </div>
          <div className="basis-1/3 sm:basis-1/4 sm:px-4">
            <Suspense
              fallback={
                <div className="h-10 w-full bg-gray-100 animate-pulse rounded-lg" />
              }
            >
              <SearchBar />
            </Suspense>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 truncate md:text-clip font-medium transition-colors ${
                  pathname === link.href
                    ? "text-brand-600"
                    : "text-gray-600 hover:text-brand-600"
                }`}
              >
                <span className="flex items-center gap-2 ">
                  {link.icon}
                  {link.label}
                </span>
                <div
                  className={`w-full h-[2px] ${pathname === link.href ? "bg-brand-600" : "bg-transparent"} rounded-full transition duration-300`}
                />
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Link
                href="/contact"
                className="bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-700 transition shadow-lg shadow-brand-500/30"
              >
                Contact us
              </Link>
              {isAuthenticated && logoutButton}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 p-2 rounded-md hover:bg-gray-100"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <div className="flex items-center bg-brand-500/80 hover:bg-brand-600/80 transition rounded-full text-white p-2">
                  <CloseIcon />
                </div>
              ) : (
                <div className="flex items-center bg-brand-500/80 hover:bg-brand-600/80 transition rounded-full text-white p-2">
                  <MenuIcon />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className={`md:hidden bg-white border-t border-gray-100 absolute left-0 top-16 shadow-lg h-screen w-5/6 max-w-sm transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50"
              >
                <span className="flex items-center gap-2 ">
                  {link.icon}
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-center bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-700 transition"
              >
                Contact us
              </Link>
              {isAuthenticated && (
                <div className="flex justify-center">{logoutButton}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
