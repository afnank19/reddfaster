export const runtime = "nodejs";


const RESULT_LIMIT = 50;
export const GetImagesFromSubreddit = async (subreddit) => {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}/hot.json?limit=${RESULT_LIMIT}`,
    {
        headers: {
          'User-Agent': 'Mozilla/5.0', // Reddit is more permissive with real browser agents
        },
    }
  );

  if (!response.ok) {
    throw new Error("Unavailable subreddit");
  }
  const json = await response.json();
  console.log(json)
  const posts = json.data.children;

  // Rewrite image URLs through proxy
  const images = posts
    .filter((post) => post.data.post_hint === 'image') // Only image posts
    .map((post) => {
      const originalUrl = post.data.preview.images[0].resolutions[post.data.preview.images[0].resolutions.length-1].url;
      // console.log(originalUrl.replace(/&amp;/g, '&'))
      const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(originalUrl.replace(/&amp;/g, '&'))}`;
      return {
        ...post.data,
        proxiedUrl,
      };
    });

  return { data: images, after: json.data.after, before: json.data.before };
};

export const GetImagesFromSubredditProxied = async (subreddit, cursor) => {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=${RESULT_LIMIT}&${cursor}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0', // Reddit prefers this
        },
      }
    );
  
    console.log(response)
    if (!response.ok) {
      throw new Error("Unavailable subreddit");
    }
    const json = await response.json();
    console.log(json)
    const posts = json.data.children;
  
    // Rewrite image URLs through proxy
    const images = posts
      .filter((post) => post.data.post_hint === 'image') // Only image posts
      .map((post) => {
        const originalUrl = post.data.preview.images[0].resolutions[post.data.preview.images[0].resolutions.length-1].url;
        // console.log(originalUrl.replace(/&amp;/g, '&'))
        const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(originalUrl.replace(/&amp;/g, '&'))}`;
        return {
          ...post.data,
          proxiedUrl,
        };
      });
  
    return { data: images, after: json.data.after, before: json.data.before };
};

export const searchForSubreddits = async (searchTerm) => {
  const response = await fetch(
    `https://www.reddit.com/subreddits/search.json?q=${searchTerm}&include_over_18=false`
  );

  const result = await response.json();

  return result.data.children;
};