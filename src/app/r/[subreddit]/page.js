export const runtime = "nodejs";
import Link from "next/link";
import { GetImagesFromSubredditProxied } from "../../../api/subreddit"
import Search from "../../../components/Search";
// import MediaGrid from "@/components/MediaGrid";
import MediaGridT from "./../../../components/MediaGridT";
import { Suspense } from "react";

async function getPosts(subreddit, cursor) {
  let query_subredd = subreddit ? subreddit : "Pics"

  const res = await GetImagesFromSubredditProxied(query_subredd, cursor);

  return {posts: res.data, after: res.after, before: res.before };
}

export default async function PostsPage({ params, searchParams }) {
    const { subreddit } = await params;
    const sp = await searchParams;
    const afterCursor =  sp.after;

    let cursor;
    if (afterCursor != undefined) {
      cursor = "after=" + afterCursor;
    }


    const { posts, after} = await getPosts(subreddit, cursor);

    const nextUrl = "/r/"+subreddit+"?after="+after;

  return (
    <div className="flex flex-col items-center">
      <Link href={"/"} className="font-bold text-3xl py-1">Redd<span className="text-[#FF5700]">Faster</span></Link>
      <p className="font-sm text-neutral-400">Browse reddit images super fast!</p>
      <Search />
      <h3 className="pt-8 font-bold text-xl">Viewing: r/{subreddit}</h3>
      <Suspense fallback={<div className="p-4">Loading images…</div>}>
        <MediaGridT key={nextUrl} data={posts} nextUrl={nextUrl}/>
      </Suspense>
    </div>
  );
}
