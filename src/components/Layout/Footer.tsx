import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const links1 = [
        { href: "/about", label: "About" },
        { href: "/privacy", label: "Privacy policy" },
        { href: "/termsconditions", label: "Terms & conditions" },
        { href: "/disclaimer", label: "Disclaimer" },
    ];
    const links2 = [
        { href: "/projects", label: "Projects" },
        { href: "/resumes", label: "Resumes" },
        { href: "/tests", label: "Tests" },
    ];
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className='flex flex-col gap-4'>
                            <Image src="/logo.png" alt="Logo" width={100} height={100} className='object-contain' />
                            <p className="text-gray-500 max-w-sm text-sm sm:text-base">
                                <strong>Collaborations</strong>
                                <br />
                                <a href="mailto:campuslogics.in@gmail.com" className="text-brand-600 hover:text-brand-700 transition">
                                    campuslogics.in@gmail.com
                                </a>
                            </p>
                        </div>
                        <div className='flex gap-2 items-center mt-4 flex-wrap'>
                            <span className='cursor-pointer hover:bg-gray-200 p-2 rounded-full transition'>
                                <Link href="https://www.youtube.com/@Campuslogics" target="_blank">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className='w-6 h-6 text-red-500 fill-current'
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </Link>
                            </span>
                            <span className='cursor-pointer hover:bg-gray-100 p-2 rounded-full transition'>
                                <Link href="https://t.me/campuslogics" target="_blank">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className='w-6 h-6 text-sky-500 fill-current'
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
                                    </svg>
                                </Link>
                            </span>
                            <span className='cursor-pointer hover:bg-gray-100 p-2 rounded-full transition'>
                                <Link href="https://www.whatsapp.com/channel/0029VaArlbZJ3juzEnjiMH2J" target="_blank">
                                    <svg
                                        className='w-6 h-6 text-green-500 fill-current'
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 32 32"
                                        aria-hidden="true"
                                    >
                                        <path d="M16.003 3C9.374 3 4 8.373 4 15c0 2.64.77 5.09 2.09 7.16L4 29l7.07-2.06A11.94 11.94 0 0 0 16.003 27C22.63 27 28 21.627 28 15S22.63 3 16.003 3zm0 21.8c-2.17 0-4.21-.63-5.96-1.82l-.43-.28-4.19 1.22 1.23-4.08-.28-.43A9.77 9.77 0 0 1 6.2 15c0-5.39 4.41-9.8 9.803-9.8 5.39 0 9.8 4.41 9.8 9.8 0 5.39-4.41 9.8-9.8 9.8zm5.39-7.34c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.06-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.43-1.72-1.6-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.51.07-.77.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.11.55-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
                                    </svg>
                                </Link>
                            </span>
                            <span className='cursor-pointer hover:bg-gray-100 p-2 rounded-full transition'>
                                <Link href="https://www.youtube.com/@Campuslogics" target="_blank">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className='w-6 h-6 text-pink-500 fill-current'
                                        viewBox="0 0 24 24"
                                        role="img"
                                        aria-label="Instagram"
                                    >
                                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.88a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0z" />
                                    </svg>
                                </Link>
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Links</h4>
                        <ul className="space-y-3">
                            {links1.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-500 hover:text-brand-600 transition">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {links2.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-500 hover:text-brand-600 transition">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center items-center">
                    <p className="text-sm text-center text-gray-400">
                        &copy; {new Date().getFullYear()} CampusLogics. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
