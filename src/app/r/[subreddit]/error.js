'use client'
import Link from "next/link";
import Search from "../../../components/Search";

const ErrorMsg = () => {
    return (
        <div className="w-full flex flex-col items-center">
        <Link href={"/"} className="font-bold text-3xl py-1">Redd<span className="text-[#FF5700]">Faster</span></Link>
      <p className="font-sm text-neutral-400">Browse reddit images super fast!</p>
      <Search />
        <p className="w-full text-center py-8 text-red-200">Subreddit Unavailable :(</p>
        </div>
    )
}

export default ErrorMsg;