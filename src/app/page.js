// This is a Server Component by default (no 'use client')
import Search from "../components/Search"

export default async function PostsPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="font-bold text-3xl py-1">Redd<span className="text-[#FF5700]">Faster</span></p>
      <p className="font-sm text-neutral-400">Browse reddit images super fast!</p>
      <Search />
    </div>
  );
}
