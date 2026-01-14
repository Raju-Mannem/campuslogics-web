"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeaderContentProps {
    links: { href: string; label: string }[];
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
        <header className="fixed top-0 w-full z-50 bg-background-50 border-b border-gray-200 shadow-lg shadow-gray-500/30">
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
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-1 items-center justify-center px-8">
                        {/* Center Search Bar for Desktop if needed, or keep it right aligned? Original was just 'flex items-center' */}
                        {/* The original code had search input here. Let's keep it but maybe hide on small mobile or make it responsive */}
                        <div className="w-full max-w-md">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search"
                                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-md text-base sm:text-lg font-medium transition-colors ${pathname === link.href ? "text-brand-600" : "text-gray-600 hover:text-brand-600"
                                    }`}
                            >
                                {link.label}
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
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
                    <div className="px-4 py-4 space-y-4">
                        {/* Mobile Search */}
                        <div className="mb-4">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search"
                                className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50"
                            >
                                {link.label}
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
                                <div className="flex justify-center">
                                    {logoutButton}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
