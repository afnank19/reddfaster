'use client'
import Link from "next/link";
import Search from "../../../components/Search";

const ErrorMsg = () => {
    return (
        <div className="w-full flex flex-col items-center">
        <Link href={"/"} className="text-2xl font-bold text-center">Reddview</Link>
        <Search />
        <p className="w-full text-center py-8 text-red-200">Subreddit Unavailable :(</p>
        </div>
    )
}

export default ErrorMsg;