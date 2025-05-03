'use client';

import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { GetImagesFromSubredditProxied } from "../api/subreddit";
import { useEffect, useState } from 'react';

export default function FastLink({ subreddit, index }) {
  const queryClient = useQueryClient();
  const [imagesFetched, setImagesFetched] = useState(false);

  const handlePrefetch = async () => {
    if (imagesFetched) {
      return;
    }

    await queryClient.prefetchQuery({
      queryKey: ['subreddit', subreddit],
      queryFn: () => GetImagesFromSubredditProxied(subreddit),
      staleTime: 1000 * 60 * 60, // 5 minutes
    });

    const data = queryClient.getQueryData(["subreddit", subreddit]);

    if (data == undefined) {
      return;
    }

    data.data.map((childData, index) => {
      // console.log(childData.proxiedUrl);
      if (index > 7 || imagesFetched) {
        return;
      }

      const img = new Image();
      const encoded = encodeURIComponent(childData.proxiedUrl);

      img.src = "/_next/image?url="+encoded + "&w=640&q=80";
    })
    setImagesFetched(true);
  };

  useEffect(() => {
    if (index > 4) {
      return;
    }

    const prefetch = async () => {
      await handlePrefetch();
    }

    prefetch();
  }, [])

  return (
    <Link
      prefetch={true}
      href={`/r/${subreddit}`}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
    >
      r/{subreddit}
    </Link>
  );
}
