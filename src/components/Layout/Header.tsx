import { auth, signOut } from '@/auth';
import HeaderContent from './HeaderContent';

export default async function Header() {
    const session = await auth();
    const links = [
        { href: "/internships", label: "Internships" },
        { href: "/scholarships", label: "Scholarships" },
        { href: "/tests", label: "Tests" },
        // { href: "/courses", label: "Courses" },
        { href: "/admissions", label: "Admissions" },
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
