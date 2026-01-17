'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PaginationControls({ totalPages, currentPage, pathJoin }: { totalPages: number, currentPage: number, pathJoin: string }) {
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const segments = pathname.split('/');
    segments[segments.length - 1] = pageNumber.toString();

    return segments.join(pathJoin);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 rounded-md border ${currentPage <= 1 ? 'invisible' : 'hover:bg-gray-100'}`}
      >
        Previous
      </Link>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`px-4 py-2 rounded-md border ${
              page === currentPage ? 'bg-brand-600 text-white' : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 rounded-md border ${currentPage >= totalPages ? 'invisible' : 'hover:bg-gray-100'}`}
      >
        Next
      </Link>
    </div>
  );
}