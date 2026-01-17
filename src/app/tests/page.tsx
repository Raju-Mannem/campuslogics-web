
import Link from 'next/link';

export default function TestsPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Tests</h3>
            <p className="text-gray-600 max-w-md mb-8">
                Will be available soon
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
