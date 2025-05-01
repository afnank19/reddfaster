'use client'
import { useState } from "react"
import { GetImagesFromSubredditProxied, searchForSubreddits } from "../api/subreddit";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Search = () => {
    const [query, setQuery] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData]  = useState(null);

    const router = useRouter();

    const handleSearch = (e) => {

        if (e.key === "Enter") {
            // router.replace("/r/"+query.trim())
            fetchSubreddits();
        }
    }

    const fetchSubreddits = async () => {
        try {
            setLoading(true)
            setError(false)
            const data = await searchForSubreddits(query);
            const debug = await GetImagesFromSubredditProxied("pics");

            console.log(debug);

            setData(data);
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const handleMouseEnter = (href) => {
        console.log("prefetching: "+href)
        router.prefetch(href);
    }



    return (
        <div className="flex w-full items-center flex-col gap-4" >
            <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch }
                placeholder="e.g. memes"
                className="border-b border-neutral-500 focus:outline-none focus:ring-0 focus:border-[#FF5700] px-2 py-1 mt-8 w-full max-w-lg"
            />
            {   isLoading ? 
                <div className="text-neutral-400 text-sm text-center">
                    Loading...
                </div> 
                : isError ? 
                <div>
                    Oops, you went a little too fast!
                </div> 
                : data !== null ?
                <div className="flex flex-col gap-2 items-start w-full max-w-lg overflow-y-scroll h-[50vh] bg-[#131313] rounded-2xl">
                    {data.map((subreddit, index) => {
                        return (
                            <Link key={index} 
                                className="px-3 text-[#C6C6C6] hover:underline hover:text-[#FF8b60] underline-offset-1" 
                                href={"/r/"+subreddit.data?.display_name} 
                                prefetch={false}
                                onMouseEnter={() => handleMouseEnter("/r/"+subreddit.data?.display_name)}
                            >
                                r/{subreddit.data?.display_name}
                            </Link>
                        )
                    })}
                    
                </div>
                : null
            }
        </div>
    )
}

export default Search;