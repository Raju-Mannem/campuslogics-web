"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./Icons";

export default function SearchBar() {
  const router = useRouter();
  
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex items-center border border-brand-500/50 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-brand-500 focus-within:border-transparent transition-all"
    >
      <input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-2 sm:px-4 py-1.5 text-sm focus:outline-none bg-transparent"
      />
      <button 
        type="submit" 
        className="px-2 sm:px-3 py-2 bg-brand-500/10 border-l border-brand-500/50 hover:bg-brand-500/20 transition group"
        aria-label="Submit search"
      >
        <SearchIcon className="size-3 sm:size-5 text-brand-500/80 group-hover:text-brand-600/80 transition-colors" />
      </button>
    </form>
  );
}