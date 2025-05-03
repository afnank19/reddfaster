'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PrefetchLink from "./PrefetchLink";
import { GetImagesFromSubredditProxied } from "../api/subreddit";
import { useQuery } from '@tanstack/react-query';

const MediaGrid = ({ subreddit, nextUrl }) => {
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  // const [isError, setError] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['subreddit', subreddit],
    queryFn: () => GetImagesFromSubredditProxied(subreddit),
    staleTime: 1000 * 60 * 5,
  });


  // useEffect(() => {
  //   const fetchSubreddits = async () => {
  //           try {
  //               setLoading(true)
  //               setError(false)
  //               const data = await GetImagesFromSubredditProxied(subreddit);
    
  //               console.log(data.data);
    
  //               setData(data.data);
  //           } catch (error) {
  //               console.log(error)
  //               setError(true)
  //           } finally {
  //               setLoading(false)
  //           }
  //   }

  //   fetchSubreddits();
  // }, [subreddit, nextUrl])

  if (isLoading) {
    return (
      <div className="text-neutral-400 text-sm text-center">
          Loading...
      </div> 
    )
  }

  if (error) {
    return (
      <div>
          Oops, you went a little too fast!
      </div> 
    )
  }

  return (
    <>
      <div className=" gap-4 p-4 items-center md:columns-4 columns-1">
        {data != null ? data.data.map((childData, index) => {

          return "image" == "image" ? (
            <div key={index} className="">
              <Image 
                  alt="image from reddit"
                  key={index} 
                  loading={index > 10 ? "lazy" : "eager"} 
                  src={childData.proxiedUrl.replace(/&amp;/g, '&')} 
                  width="640" 
                  height="640" 
                  className="w-full object-cover rounded-lg m-1 mt-4 bg-neutral-800"
                  quality={80}
              />
              {/* <img
                key={index}
                loading="lazy"
                width="640"
                height="331"
                src={childData.proxiedUrl.replace(/&amp;/g, '&')}
                className="w-full object-cover border border-[#b997db] m-1"
              ></img> */}
            </div>
          ) : null;
        }) : null}
      </div>
      <div className="flex gap-5 py-8 mb-8">
        {/* <Link href={nextUrl} className="text-xl" prefetch={true}>Next</Link> */}
        <PrefetchLink href={nextUrl}>Next</PrefetchLink>
      </div>
    </>
  );
};

export default MediaGrid;