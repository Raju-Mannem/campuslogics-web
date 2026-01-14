import PostSkeleton from '@/components/PostSkeleton';

export default function Loading() {
    return (
       <section className="min-h-screen">
      <div className='z-10 flex items-center justify-center gap-4 top-10 w-full h-64 px-24 bg-brand-600/10 rounded-[0px_0px_300px]'>
        <div className='flex-1/4'>
          <div className="h-10 bg-brand-600/10 rounded-md w-32 animate-pulse" />
        </div>
        <div className='flex-3/4 flex gap-8 items-center justify-center flex-wrap'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-24 h-9 bg-brand-600/10 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>

      <div className="relative border-b border-gray-200 overflow-hidden">
        <div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="col-span-1 flex flex-col justify-start items-start gap-4 mb-12 border-r border-gray-300">
            <div className="h-10 bg-gray-200 rounded-md w-24 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-lg w-full max-w-[150px] animate-pulse" />
          </div>
          <div className="col-span-3">
            <PostSkeleton />
          </div>
        </div>
      </div>
        </section>
    );
}
