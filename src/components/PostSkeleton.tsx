export default function PostSkeleton() {
  return (
    <div className="w-full h-full grid grid-cols-1 gap-12">
      {[1, 2, 3].map((i) => (
        <article key={i} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid gap-2 grid-cols-3">
            {/* Image Placeholder */}
            <div className="col-span-1 relative w-full bg-gray-200 animate-pulse" />
            
            <div className="col-span-2 flex flex-col gap-4 p-6">
              {/* Title Placeholder */}
              <div className="h-7 bg-gray-200 rounded-md w-3/4 animate-pulse" />
              
              {/* Meta info Placeholder */}
              <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              </div>

              {/* Description Lines */}
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>

              {/* Tags Placeholder */}
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-gray-100 rounded-full w-12 animate-pulse" />
                <div className="h-6 bg-gray-100 rounded-full w-16 animate-pulse" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}