// app/api/reddit-proxy/route.js
export const runtime = 'nodejs';      // ensure we’re in Node.js, not the Edge runtime

import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const subreddit = searchParams.get('subreddit');
  const after     = searchParams.get('cursor');
  const limit     = process.env.RESULT_LIMIT || 50;

  if (!subreddit) {
    return NextResponse.json(
      { error: 'Missing subreddit parameter' },
      { status: 400 }
    );
  }

  // Build the Reddit URL
  const url = new URL(`https://www.reddit.com/r/${subreddit}/hot.json`);
  url.searchParams.set('limit', String(limit));
  if (after) url.searchParams.set('after', after);

  // Server‐side fetch with a custom UA
  const redditRes = await fetch(url.toString(), {
    headers: {
      'User-Agent': 'web:reddfaster:v1.0 (by /u/afnank19)',
      'Accept': 'application/json'
    }
  });

  if (!redditRes.ok) {
    const text = await redditRes.text();
    return NextResponse.json(
      { error: text || `Reddit returned ${redditRes.status}` },
      { status: redditRes.status }
    );
  }

  const json = await redditRes.json();
  // Cache at the edge of your own proxy for 30s
  return NextResponse.json(json, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=30, stale-while-revalidate'
    }
  });
}
