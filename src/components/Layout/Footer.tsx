import Link from 'next/link';
import Image from 'next/image';
import { YoutubeIcon, TelegramIcon, WhatsappIcon, InstagramIcon } from './SocialIcons';
import { BookCheckIcon, FileUserIcon, GlobeLockIcon, InfoIcon, ProjectorIcon, ReceiptTextIcon, ScrollTextIcon } from 'lucide-react';

export default function Footer() {
    const links1 = [
        { href: "/about", label: "About", icon: <InfoIcon className="size-4"/> },
        { href: "/privacy", label: "Privacy policy", icon: <GlobeLockIcon className="size-4" /> },
        { href: "/termsconditions", label: "Terms & conditions", icon: <ReceiptTextIcon className="size-4" /> },
        { href: "/disclaimer", label: "Disclaimer", icon: <ScrollTextIcon className="size-4" /> },
    ];
    const links2 = [
        { href: "/projects", label: "Projects", icon: <ProjectorIcon className="size-4" /> },
        { href: "/resumes", label: "Resumes", icon: <FileUserIcon className="size-4" /> },
        { href: "/tests", label: "Tests", icon: <BookCheckIcon className="size-4" /> },
    ];
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className='flex flex-col'>
                            <Image src="/logot.png"
                                alt="Logo"
                                width={100}
                                height={100}
                                className='h-32 w-32 object-contain'
                                priority
                            />
                            <p className="text-gray-500 max-w-sm text-base sm:text-sm">
                                <strong>Collaborations</strong>
                                <br />
                                <a href="mailto:web.campuslogics@gmail.com" className="text-brand-600 hover:text-brand-700 transition">
                                    web.campuslogics@gmail.com
                                </a>
                            </p>
                        </div>
                        <div className='flex gap-2 items-center mt-4 flex-wrap'>
                            <span className='cursor-pointer hover:bg-gray-200 p-2 rounded-full transition'>
                                <Link href="https://www.youtube.com/@Campuslogics" target="_blank">
                                    <YoutubeIcon 
                                    className='text-red-500'
                                    />
                                </Link>
                            </span>
                            <span className='cursor-pointer hover:bg-gray-100 p-2 rounded-full transition'>
                                <Link href="https://t.me/campuslogics" target="_blank">
                                    <TelegramIcon 
                                    className='text-sky-500'
                                    />
                                </Link>
                            </span>
                            <span className='cursor-pointer hover:bg-gray-100 p-2 rounded-full transition'>
                                <Link href="https://www.whatsapp.com/channel/0029VaArlbZJ3juzEnjiMH2J" target="_blank">
                                    <WhatsappIcon 
                                    className='text-green-500'
                                    />
                                </Link>
                            </span>
                            <span className='cursor-pointer hover:bg-gray-100 p-2 rounded-full transition'>
                                <Link href="https://www.youtube.com/@Campuslogics" target="_blank">
                                    <InstagramIcon 
                                    className='text-pink-500'
                                    />
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
                                        <span className="flex items-center gap-2">{link.icon}{link.label}</span>
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
                                        <span className="flex items-center gap-2">{link.icon}{link.label}</span>
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
