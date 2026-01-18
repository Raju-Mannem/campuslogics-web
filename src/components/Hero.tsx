
import { categories } from "./data/categories";
import Link from "next/link";

export default function Hero() {
    return (
        <div className='z-10 relative flex flex-col lg:flex-row items-center justify-center gap-4 w-full min-h-[16rem] h-auto mb-12 px-6 lg:px-24 py-12 bg-brand-600/20 rounded-b-[50px] sm:rounded-[0px_0px_300px] overflow-hidden'>
        <div className='w-full h-full lg:w-1/4 mb-2 lg:mb-0 text-center lg:text-left'>
          <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
        </div>
        <div className='w-full h-full lg:w-3/4 flex gap-4 lg:gap-8 items-center justify-center lg:justify-start flex-wrap'>
          {categories.map((category) => (
            <Link key={category.value} href={`/category/${category.value}`} className="px-4 py-2 text-sm font-medium text-white bg-brand-600/20 hover:bg-brand-700 rounded-lg transition-colors whitespace-nowrap">
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    )
}