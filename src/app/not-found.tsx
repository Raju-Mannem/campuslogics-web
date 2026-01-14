
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-9xl font-black text-gray-100 mb-4">404</h2>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h3>
            <p className="text-gray-600 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-medium shadow-lg shadow-brand-500/20"
            >
                Return Home
            </Link>
        </div>
    );
}
