import Image from 'next/image';

interface YouTubeVideo {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeSearchResponse {
  items?: YouTubeVideo[];
  error?: {
    message: string;
  };
}

async function getLatestVideos(): Promise<YouTubeVideo[]> {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  const MAX_RESULTS = 5;

  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`;

  const res = await fetch(url, { next: { revalidate: 3600 * 24 } });
  
  if (!res.ok) {
    console.error('YouTube API Error:', res.statusText);
    return [];
  }

  const data: YouTubeSearchResponse = await res.json();
  return data.items || [];
}

export default async function YouTubeFeed() {
  const videos = await getLatestVideos();

  return (
    <div className="min-h-screen border-x border-gray-200 shadow-lg px-4 py-12">
      <h3 className="text-xl font-bold mb-4">Latest from YouTube</h3>
      <div className="flex flex-col justify-center items-center gap-8">
        
        {videos.map((video) => (
          <a 
            key={video.id.videoId} 
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-gray-100 p-4 rounded-lg shadow-lg w-full max-w-md"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
              <Image 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <p className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-blue-600">
              {video.snippet.title}
            </p>
          </a>
        ))}

        {videos.length === 0 && (
          <p className="text-gray-500 italic">No videos found.</p>
        )}
      </div>
    </div>
  );
}