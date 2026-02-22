import { auth, signOut } from '@/auth';
import HeaderContent from './HeaderContent';
import { BookCheckIcon, BriefcaseBusinessIcon, GraduationCapIcon, SchoolIcon } from 'lucide-react';

export default async function Header() {
    const session = await auth();
    const links = [
        { href: "/internships", label: "Internships", icon: <BriefcaseBusinessIcon className="size-5 sm:size-5" /> },
        { href: "/scholarships", label: "Scholarships", icon: <GraduationCapIcon className="size-5 sm:size-5" /> },
        { href: "/tests", label: "Tests", icon: <BookCheckIcon className="size-5 sm:size-5" /> },
        { href: "/admissions", label: "Admissions", icon: <SchoolIcon className="size-5 sm:size-5" /> },
    ];

    const logoutButton = (
        <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
        }}>
            <button type="submit" className="text-gray-500 hover:text-red-600 transition p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
            </button>
        </form>
    );

    return (
        <HeaderContent
            links={links}
            isAuthenticated={!!session?.user}
            logoutButton={logoutButton}
        />
    );
}
