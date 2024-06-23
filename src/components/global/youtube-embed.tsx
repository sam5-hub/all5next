'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'

const getVideoId = (videoUrl: string) => {
    const urlObj = new URL(videoUrl);
    return urlObj.searchParams.get('v');
  };

export const YouTubeEmbed = ({ url } : {url : string}) => {
    
    const videoId = getVideoId(url);
  
    return (
        <div className="relative" style={{ paddingTop: '56.25%', width: '100%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          style={{ width: '100%', height: '100%' }}
          src={`https://www.youtube.com/embed/${videoId}?si=gRzYmAUSQV8yw3ZA`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title="YouTube video player"
        />
      </div>
    );
  };
    