'use client';

import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { GetImagesFromSubredditProxied } from "../api/subreddit";

export default function FastLink({ subreddit }) {
  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['subreddit', subreddit],
      queryFn: () => GetImagesFromSubredditProxied(subreddit),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  return (
    <Link
      href={`/r/${subreddit}`}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
    >
      r/{subreddit}
    </Link>
  );
}
